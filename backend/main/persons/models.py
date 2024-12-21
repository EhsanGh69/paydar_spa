from django.db import models

from django_jalali.db import models as jmodels


class Personnel(models.Model):
    # string fields
    full_name = models.CharField(max_length=250, null=True, blank=True, verbose_name="نام و نام خانوادگی")
    job = models.CharField(max_length=100, null=True, blank=True, verbose_name="سمت")
    phone = models.CharField(max_length=20, null=True, blank=True, verbose_name="تلفن ثابت")
    father_name = models.CharField(max_length=250, null=True, blank=True, verbose_name="نام پدر")
    national_id = models.CharField(max_length=10, null=True, blank=True, verbose_name="کد ملی")
    personnel_code = models.CharField(max_length=50, null=True, blank=True, verbose_name="کد پرسنلی")
    mobile = models.CharField(max_length=20, null=True, blank=True, verbose_name="موبایل")
    address = models.TextField(null=True, blank=True, verbose_name="آدرس")
    descriptions = models.TextField(null=True, blank=True, verbose_name="توضیحات")

    # integer fields
    children_number = models.PositiveSmallIntegerField(default=0, null=True, blank=True, verbose_name="تعداد فرزند")
    work_experience = models.PositiveSmallIntegerField(default=0, null=True, blank=True, verbose_name="سابقه کار")
    contract_period = models.PositiveSmallIntegerField(default=0, null=True, blank=True, verbose_name="مدت زمان قرارداد")

    # choice fields
    marital_status = models.CharField(max_length=20, null=True, blank=True, verbose_name="وضعیت تأهل")
    contract_type = models.CharField(max_length=20, null=True, blank=True, verbose_name="نوع قرارداد")
    insurance_status = models.CharField(max_length=20, null=True, blank=True, verbose_name="وضعیت بیمه")
    province_county = models.CharField(default="", max_length=100, null=True, blank=True, verbose_name="استان و شهرستان")
    
    # date field
    birth_date = jmodels.jDateField(null=True, blank=True, verbose_name="تاریخ تولد")
    start_activity_date = jmodels.jDateField(null=True, blank=True, verbose_name="تاریخ شروع فعالیت")
    created_time = jmodels.jDateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_time = jmodels.jDateTimeField(auto_now=True, verbose_name="تاریخ ویرایش")

    class Meta:
        verbose_name = "پرسنل"
        verbose_name_plural = "پرسنل"

    def __str__(self):
        return self.full_name
    

class Owner(models.Model):
    full_name = models.CharField(max_length=250, null=True, blank=True, verbose_name="نام و نام خانوادگی")
    phone = models.CharField(max_length=20, null=True, blank=True, verbose_name="تلفن ثابت")
    mobile = models.CharField(max_length=20, null=True, blank=True, verbose_name="موبایل")
    address = models.TextField(null=True, blank=True, verbose_name="آدرس")
    descriptions = models.TextField(null=True, blank=True, verbose_name="توضیحات")
    national_id = models.CharField(max_length=10, null=True, blank=True, verbose_name="کد ملی")
    ownership_type = models.CharField(max_length=10, null=True, blank=True, verbose_name='نوع مالکیت')
    created_time = jmodels.jDateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_time = jmodels.jDateTimeField(auto_now=True, verbose_name="تاریخ ویرایش")

    class Meta:
        verbose_name = "مالک"
        verbose_name_plural = "مالکین"

    def __str__(self):
        return self.full_name

