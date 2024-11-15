from rest_framework import viewsets

from .models import Personnel
from .serializers import PersonnelSerializer

class PersonnelViewSet(viewsets.ModelViewSet):
    queryset = Personnel.objects.all()
    serializer_class = PersonnelSerializer
    ordering = ['-id']
    search_fields = ['full_name', 'job', 'address', 'province', 'city']
