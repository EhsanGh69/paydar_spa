from rest_framework import viewsets

from .models import ModelFields, ProvinceCountyList
from .serializers import ModelFieldsSerializer, ProvinceCountyListSerializer

class ModelFieldsViewSet(viewsets.ModelViewSet):
    queryset = ModelFields.objects.all()
    serializer_class = ModelFieldsSerializer
    lookup_field = "model_name"


class ProvinceCountyListViewSet(viewsets.ModelViewSet):
    queryset = ProvinceCountyList.objects.all()
    serializer_class = ProvinceCountyListSerializer
    lookup_field = "province_slug"

