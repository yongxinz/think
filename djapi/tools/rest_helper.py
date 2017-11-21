# coding=utf-8
from rest_framework.pagination import PageNumberPagination


class YMPagination(PageNumberPagination):
    page_size = 15
    page_size_query_param = 'size'
    max_page_size = 1000
