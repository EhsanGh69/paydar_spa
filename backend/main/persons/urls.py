from rest_framework import routers

from .views import PersonnelViewSet, OwnerViewSet, ContractorViewSet

router = routers.SimpleRouter()
router.register('personnel', PersonnelViewSet, basename='personnel')
router.register('owners', OwnerViewSet, basename='owners')
router.register('contractors', ContractorViewSet, basename='contractors')
urlpatterns = router.urls
