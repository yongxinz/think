# coding=utf-8
import uuid

from django.db import models


class WeixinUsers(models.Model):
    openid = models.CharField(u'openid', max_length=50)
    unionid = models.CharField(u'uuid', max_length=50, default='')
    session_key = models.CharField(max_length=50, default='')
    sid = models.UUIDField(default=uuid.uuid1)
    is_del = models.BooleanField(default=False)
    created = models.DateTimeField(u"注册时间", auto_now_add=True)

    class Meta:
        ordering = ['-pk']
        get_latest_by = "pk"
