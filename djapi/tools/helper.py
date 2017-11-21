# coding=utf-8

import requests
import datetime
import re
import random
from decimal import Decimal

from django.conf import settings


class Helper(object):
    @classmethod
    def get_safe_now(self):
        try:
            from django.utils.timezone import utc
            if settings.USE_TZ:
                return datetime.datetime.utcnow().replace(tzinfo=utc)
        except:
            pass

        return datetime.datetime.now()

    @classmethod
    def mk_random(self, num=8, ram_type='str'):
        ram_int = '1234567890'
        ram_str = 'abcdefghigklmnopqrstuvwxyz1234567890'

        if ram_type != 'str':
            ram_str = ram_int

        return "".join(random.sample(ram_str, num))

    @classmethod
    def password_format_check(self, password):
        result = {"status": True}
        # 至少8位
        if len(password) < 8:
            result.update({"status": False, 'msg': "密码过于简单，密码至少8位"})
        # 至少一个数字
        if not re.match(r'.*[0-9]+', password):
            result.update({"status": False, 'msg': "密码过于简单，至少包括一个数字"})
        # 至少一个小写字母
        if not re.match(r'.*[a-zA-Z]+', password):
            result.update({"status": False, 'msg': "密码过于简单，至少包括一个字母"})

        return result

    @classmethod
    def mobile_format_check(self, mobile):
        result = {"status": True}
        # 至少11位
        if len(mobile) != 11:
            result.update({"status": False, 'msg': u"请填写11位手机号码"})
        # 全部数字
        if not re.match(r'^1[0-9]{10}', mobile):
            result.update({"status": False, 'msg': u"手机格式不对，请填写11位手机号码"})

        return result


class Dict2obj(object):
    def __init__(self, dict_data):
        self.__dict__ = dict_data

    def __str__(self):
        return str(self.__dict__)

    def __getattr__(self, item):
        return self.__dict__.get(item)


def random_digit_challenge():
    ret = u''
    for i in range(4):
        ret += str(random.randint(0, 9))
    return ret, ret


class YMapi(object):
    # YMapi.get('adp', 'erp').json()

    @classmethod
    def get(self, api=' ', service='erp', params=None):
        host = settings.API_SRV.get(service).get('host')
        api = settings.API_SRV.get(service).get('api').get(api)
        auth = settings.API_SRV.get(service).get('authorization')
        key = settings.API_SRV.get(service).get('key')
        if auth:
            r = requests.get(url=host + api, headers={'AUTHORIZATION': auth}, params=params)
        else:
            r = requests.get(url=host + api + '?key=' + key, params=params)
        return r

    @classmethod
    def post(self, api='url', service='erp', params=None, data=None, pk=''):
        host = settings.API_SRV.get(service).get('host')
        api = settings.API_SRV.get(service).get('api').get(api)
        auth = settings.API_SRV.get(service).get('authorization')
        key = settings.API_SRV.get(service).get('key')
        pk = (pk + '/') if pk else ''
        if auth:
            r = requests.post(url=host + api + pk, headers={'AUTHORIZATION': auth}, params=params, json=data)
        else:
            r = requests.post(url=host + api + pk + '?key=' + key, params=params, json=data)
        return r

    @classmethod
    def put(self, api='url', service='erp', params=None, data=None, pk=''):
        host = settings.API_SRV.get(service).get('host')
        api = settings.API_SRV.get(service).get('api').get(api)
        auth = settings.API_SRV.get(service).get('authorization')
        key = settings.API_SRV.get(service).get('key')
        pk = (pk + '/') if pk else ''
        if auth:
            r = requests.put(url=host + api + pk, headers={'AUTHORIZATION': auth}, params=params, json=data)
        else:
            r = requests.put(url=host + api + pk + '?key=' + key, params=params, json=data)
        return r

    @classmethod
    def patch(self, api='url', service='erp', params=None, data=None, pk=''):
        host = settings.API_SRV.get(service).get('host')
        api = settings.API_SRV.get(service).get('api').get(api)
        auth = settings.API_SRV.get(service).get('authorization')
        key = settings.API_SRV.get(service).get('key')
        pk = (pk + '/') if pk else ''
        if auth:
            r = requests.patch(url=host + api + pk, headers={'AUTHORIZATION': auth}, params=params, json=data)
        else:
            r = requests.patch(url=host + api + pk + '?key=' + key, params=params, json=data)
        return r

    @classmethod
    def delete(self, api='url', service='erp', params=None, pk=''):
        host = settings.API_SRV.get(service).get('host')
        api = settings.API_SRV.get(service).get('api').get(api)
        auth = settings.API_SRV.get(service).get('authorization')
        key = settings.API_SRV.get(service).get('key')
        pk = (pk + '/') if pk else ''
        if auth:
            r = requests.delete(url=host + api + pk, headers={'AUTHORIZATION': auth}, params=params)
        else:
            r = requests.delete(url=host + api + pk + '?key=' + key, params=params)
        return r


def decimal_round(value, num=2):
    save_num = '{:.' + str(num) + 'f}'
    return save_num.format(Decimal(str(value)))
