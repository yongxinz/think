import django_filters
from .models import Think


class ThinkFilter(django_filters.rest_framework.FilterSet):

    class Meta:
        model = Think
        fields = ['id', ]
