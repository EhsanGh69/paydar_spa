from rest_framework import routers

from .views import PersonnelViewSet

router = routers.SimpleRouter()
router.register('personnel', PersonnelViewSet, basename='personnel')
urlpatterns = router.urls
