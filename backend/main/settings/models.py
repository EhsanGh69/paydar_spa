from django.db import models

from django_jalali.db import models as jmodels


class ModelFields(models.Model):
    model_name = models.CharField(max_length=20, verbose_name="نام مدل")
    persian_model_name = models.CharField(max_length=20, verbose_name="نام فارسی مدل")
    fields_data = models.TextField(null=True, blank=True, verbose_name="اطلاعات فیلدها")
    created_time = jmodels.jDateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_time = jmodels.jDateTimeField(auto_now=True, verbose_name="تاریخ ویرایش")

    class Meta:
        verbose_name = "اطلاعات فیلدهای مدل"
        verbose_name_plural = "اطلاعات فیلدهای مدل‌ها"

    def __str__(self):
        return self.model_name
    


class ProvinceCountyList(models.Model):
    province_name = models.CharField(max_length=30, verbose_name="نام استان")
    province_slug = models.SlugField(max_length=50, verbose_name="نام آدرس استان")
    county_list = models.TextField(null=True, blank=True, verbose_name="لیست شهرستان‌ها")
    created_time = jmodels.jDateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_time = jmodels.jDateTimeField(auto_now=True, verbose_name="تاریخ ویرایش")

    class Meta:
        verbose_name = "لیست شهرستان‌های استان"
        verbose_name_plural = "لیست شهرستان‌های استان‌ها"

    def __str__(self):
        return self.province_name


