from rest_framework import serializers

from .models import ModelFields, ProvinceCountyList


class ModelFieldsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelFields
        exclude = ['created_time' ,'updated_time']


class ProvinceCountyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProvinceCountyList
        exclude = ['created_time' ,'updated_time']