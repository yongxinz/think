# coding=utf-8
from rest_framework import authentication, exceptions

from passport.models import WeixinUsers
from tools.helper import Dict2obj


class YMAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        hash_key = request.META.get('HTTP_AUTHORIZATION', '123abc')
        try:
            user = WeixinUsers.objects.get(sid=hash_key, is_del=False)
        except:
            raise exceptions.AuthenticationFailed({
                'status': False,
                'status_code': 403010,
            })

        return user, Dict2obj({
            'user': user,
        })
