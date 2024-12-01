from rest_framework import serializers

from .models import Personnel, Owner


class PersonnelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personnel
        exclude = ['created_time' ,'updated_time']


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        exclude = ['created_time' ,'updated_time']

