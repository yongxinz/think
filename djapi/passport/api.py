# coding=utf-8
import uuid
import requests

from django.conf import settings
from rest_framework.decorators import list_route
from rest_framework import viewsets
from rest_framework.response import Response

from passport.models import WeixinUsers
from tools.helper import Dict2obj


class WeixinUserViewSet(viewsets.ViewSet):
    @list_route(methods=['get'], authentication_classes=())
    def login(self, request):
        # 通过微信code获取用户openid
        conf = Dict2obj(settings.WEIXIN)
        url = conf.url + "/sns/jscode2session"
        js_code = request.query_params.get('code', '')
        params = dict(appid=conf.id, secret=conf.key, js_code=js_code, grant_type="authorization_code")
        rq = requests.get(url, params=params).json()

        if rq.get('errcode'):
            return Response(dict(status=False, msg=rq))

        # 更新该微信号(openid)的sid和skey
        wx_user, is_new = WeixinUsers.objects.update_or_create(openid=rq.get('openid'), is_del=False, defaults={
            'session_key': rq.get('session_key'),
            'unionid': rq.get('unionid', ''),
            'sid': uuid.uuid4(),
        })

        return Response(dict(status=True, sid=wx_user.sid))

    @list_route(methods=['post'], authentication_classes=())
    def join2wx(self, request):
        # 检查微信登录是否成功
        sid = request.META.get('HTTP_AUTHORIZATION', 'whoareyou')
        try:
            wx_user = WeixinUsers.objects.get(sid=sid, is_del=False)
        except:
            return Response({'status': False, 'msg': u'微信验证失败，请重新授权'})
