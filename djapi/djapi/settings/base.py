#!/usr/bin/env python
# coding=utf-8

from .settings import *
from os.path import join, abspath, dirname

# make root path
here = lambda *x: join(abspath(dirname(__file__)), *x)
PROJECT_ROOT = here("..", "..")
root = lambda *x: join(abspath(PROJECT_ROOT), *x)

DEBUG = False

TIME_ZONE = 'Asia/Shanghai'
LANGUAGE_CODE = 'zh-hans'
LOGIN_URL = "/passport/login/"
LOGOUT_URL = "/passport/logout/"
LOGIN_REDIRECT_URL = "/passport/"

ALLOWED_HOSTS = [
    '127.0.0.1',
    'think.naturez.cn'
]

INTERNAL_IPS = ['127.0.0.1', 'think.naturez.cn']
INSTALLED_APPS += [
    'think',
    'passport'
]

CAPTCHA_BACKGROUND_COLOR = "#eee"
CAPTCHA_CHALLENGE_FUNCT = 'tools.helper.random_digit_challenge'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('tools.auth.YMAuthentication',),
    'DEFAULT_PAGINATION_CLASS': 'tools.rest_helper.YMPagination',
    'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend',),
}

# for test
TEST_RUNNER = 'test_runner.YmRunner'
