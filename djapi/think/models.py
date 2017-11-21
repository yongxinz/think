# coding=utf-8

from dateutil import tz

from django.conf import settings
from django.db import models
from passport.models import WeixinUsers


class Think(models.Model):
    """想法"""
    weixin = models.ForeignKey(WeixinUsers)
    think = models.TextField(u'想法', max_length=1000)
    nation = models.CharField(u"国家", max_length=20, null=True, blank=True)
    province = models.CharField(u"省", max_length=20, null=True, blank=True)
    city = models.CharField(u"城市", max_length=20, null=True, blank=True)
    address = models.CharField(u"地址", max_length=50, null=True, blank=True)
    created = models.DateTimeField(u"创建时间") 

    def get_created(self):
        return self.created.astimezone(tz.gettz(settings.TIME_ZONE)).strftime('%Y-%m-%d %H:%M:%S')

    def get_day(self):
        return self.created.day

    def get_month(self):
        return self.created.month

    class Meta:
        ordering = ['-pk']

