# coding=utf-8
from rest_framework import serializers

from .models import Think


class ThinkSerializer(serializers.ModelSerializer):
    created_display = serializers.ReadOnlyField(source='get_created')
    month = serializers.ReadOnlyField(source='get_month')
    day = serializers.ReadOnlyField(source='get_day')

    class Meta:
        model = Think
        exclude = ('weixin', 'created')
