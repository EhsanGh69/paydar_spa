from rest_framework import serializers

from .models import Personnel, Owner, Contractor


class PersonnelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personnel
        exclude = ['created_time' ,'updated_time']


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        exclude = ['created_time' ,'updated_time']

class ContractorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contractor
        exclude = ['created_time' ,'updated_time']

