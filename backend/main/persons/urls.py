from rest_framework import routers

from .views import PersonnelViewSet, OwnerViewSet

router = routers.SimpleRouter()
router.register('personnel', PersonnelViewSet, basename='personnel')
router.register('owners', OwnerViewSet, basename='owners')
urlpatterns = router.urls
