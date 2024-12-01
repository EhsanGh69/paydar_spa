from rest_framework import viewsets

from .models import Personnel, Owner
from .serializers import PersonnelSerializer, OwnerSerializer

class PersonnelViewSet(viewsets.ModelViewSet):
    queryset = Personnel.objects.all()
    serializer_class = PersonnelSerializer
    ordering = ['-id']
    search_fields = ['full_name', 'job', 'address', 'province_county']

    
class OwnerViewSet(viewsets.ModelViewSet):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer
    ordering = ['-id']
    search_fields = ['full_name', 'address']
