#!/usr/bin/env python
# coding=utf-8

from .base import *

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'think',
    }
}

INSTALLED_APPS += [
    'rest_framework',
    # 'debug_toolbar',
]

WEIXIN = {
    'url': 'https://api.weixin.qq.com',
    'id': 'your appid',
    'key': 'your appsecret',
}
