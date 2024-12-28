from rest_framework import viewsets

from .models import Personnel, Owner, Contractor
from .serializers import PersonnelSerializer, OwnerSerializer, ContractorSerializer
# from utils.helpers import CustomPageNumberPagination

class PersonnelViewSet(viewsets.ModelViewSet):
    queryset = Personnel.objects.all()
    serializer_class = PersonnelSerializer
    ordering = ['-id']
    search_fields = ['full_name', 'job', 'address', 'province_county']
    # pagination_class = CustomPageNumberPagination

    
class OwnerViewSet(viewsets.ModelViewSet):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer
    ordering = ['-id']
    search_fields = ['full_name', 'address']

class ContractorViewSet(viewsets.ModelViewSet):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer
    ordering = ['-id']
    search_fields = ['company_name', 'office_address']
