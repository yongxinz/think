# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import list_route

from .models import Think
from .serializers import ThinkSerializer
from .filter import ThinkFilter


class ThinkViewSet(viewsets.ModelViewSet):
    queryset = Think.objects.all()
    serializer_class = ThinkSerializer
    filter_class = ThinkFilter

    def get_queryset(self):
        queryset = Think.objects.filter(weixin=self.request.user)

        return queryset

    def perform_create(self, serializer):
        update_dict = {}

        update_dict['weixin'] = self.request.user
        update_dict['created'] = datetime.datetime.now()
        serializer.save(**update_dict)

    @list_route(methods=['get'])
    def earth(self, request):
        now = datetime.datetime.now()
        year = now.strftime("%Y")
        obj = Think.objects.filter(weixin=request.user, created__startswith=year)

        think_count = obj.count()
        nation_count = obj.exclude(nation='').distinct('nation').order_by('nation').count()
        city_count = obj.exclude(city='').distinct('city').order_by('city').count()

        return Response(
            data={'year': year, 'think_count': think_count, 'nation_count': nation_count, 'city_count': city_count,
                  'now': now.strftime("%Y-%m-%d %H:%M:%S")})
