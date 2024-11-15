from django.contrib import admin

from .models import ModelFields, ProvinceCountyList


class ProvinceCountyListAdmin(admin.ModelAdmin):
    ordering = ["province_name"]


admin.site.register(ModelFields)
admin.site.register(ProvinceCountyList, ProvinceCountyListAdmin)
