from django.db import models

from django_jalali.db import models as jmodels

from persons.models import Personnel



# class Project(models.Model):
#     PROJECT_CHOICES = (
#         ('exe', 'اجرایی'),
#         ('res', 'تحقیقاتی'),
#         ('ser', 'خدماتی'),
#     )
#     DURATION_CHOICES = (
#         ('day', 'روز'),
#         ('month', 'ماه'),
#         ('year', 'سال'),
#     )
#     OWNERSHIP_CHOICES = (
#         ('cowr', 'مالکیت شرکت'),
#         ('otwr', 'مالکیت غیر')
#     )
#     title = models.CharField(max_length=250, verbose_name='عنوان پروژه')
#     project_type = models.CharField(max_length=3, choices=PROJECT_CHOICES, verbose_name='نوع پروژه')
#     manager = models.ForeignKey(Personnel, related_name="projects_management", verbose_name='مدیر پروژه')
#     start_date = jmodels.jDateField(null=True, blank=True, verbose_name="تاریخ شروع")
#     duration_unit = models.CharField(null=True, blank=True, max_length=5, choices=PROJECT_CHOICES, verbose_name='واحد زمان')
#     end_duration = models.PositiveSmallIntegerField(null=True, blank=True, verbose_name='مدت تقریبی اتمام پروژه')
#     cost_estimate = models.PositiveBigIntegerField(null=True, blank=True, default=0, verbose_name='تخمین هزینه پروژه')
#     ownership_type = models.CharField(max_length=4, choices=OWNERSHIP_CHOICES, verbose_name="نوع مالکیت")
#     owners = models.ManyToManyField(Owner, related_name="projects_ownership", verbose_name="مالک / مالکین")
#     investors = models.ManyToManyField(Investor, related_name="projects_investigation", verbose_name="سرمایه گذار / سرمایه گذاران")
#     contractors = models.ManyToManyField(Contractor, related_name="projects_contract", verbose_name="پیمانکار / پیمانکاران")
#     created_time = jmodels.jDateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
#     updated_time = jmodels.jDateTimeField(auto_now=True, verbose_name="تاریخ ویرایش")

#     class Meta:
#         verbose_name = "پروژه"
#         verbose_name_plural = "پروژه ها"

#     def __str__(self):
#         return self.title


