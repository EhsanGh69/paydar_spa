from rest_framework import routers

from .views import ModelFieldsViewSet, ProvinceCountyListViewSet

router = routers.SimpleRouter()
router.register('model_fields', ModelFieldsViewSet, basename='model_fields')
router.register('county_list', ProvinceCountyListViewSet, basename='county_list')
urlpatterns = router.urls