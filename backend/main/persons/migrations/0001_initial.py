# Generated by Django 5.0.4 on 2024-11-14 19:39

import django_jalali.db.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Personnel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(blank=True, max_length=250, null=True, verbose_name='نام و نام خانوادگی')),
                ('job', models.CharField(blank=True, max_length=100, null=True, verbose_name='سمت')),
                ('phone', models.CharField(blank=True, max_length=20, null=True, verbose_name='تلفن ثابت')),
                ('father_name', models.CharField(blank=True, max_length=250, null=True, verbose_name='نام پدر')),
                ('national_id', models.CharField(blank=True, max_length=10, null=True, verbose_name='کد ملی')),
                ('personnel_code', models.CharField(blank=True, max_length=50, null=True, verbose_name='کد پرسنلی')),
                ('mobile', models.CharField(blank=True, max_length=20, null=True, verbose_name='موبایل')),
                ('address', models.TextField(blank=True, null=True, verbose_name='آدرس')),
                ('descriptions', models.TextField(blank=True, null=True, verbose_name='توضیحات')),
                ('children_number', models.PositiveSmallIntegerField(blank=True, default=0, null=True, verbose_name='تعداد فرزند')),
                ('work_experience', models.PositiveSmallIntegerField(blank=True, default=0, null=True, verbose_name='سابقه کار')),
                ('contract_period', models.PositiveSmallIntegerField(blank=True, default=0, null=True, verbose_name='مدت زمان قرارداد')),
                ('marital_status', models.CharField(blank=True, max_length=20, null=True, verbose_name='وضعیت تأهل')),
                ('contract_type', models.CharField(blank=True, max_length=20, null=True, verbose_name='نوع قرارداد')),
                ('insurance_status', models.CharField(blank=True, max_length=20, null=True, verbose_name='وضعیت بیمه')),
                ('province_county', models.CharField(blank=True, default='', max_length=100, null=True, verbose_name='استان و شهرستان')),
                ('birth_date', django_jalali.db.models.jDateField(blank=True, null=True, verbose_name='تاریخ تولد')),
                ('start_activity_date', django_jalali.db.models.jDateField(blank=True, null=True, verbose_name='تاریخ شروع فعالیت')),
                ('created_time', django_jalali.db.models.jDateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')),
                ('updated_time', django_jalali.db.models.jDateTimeField(auto_now=True, verbose_name='تاریخ ویرایش')),
            ],
            options={
                'verbose_name': 'پرسنل',
                'verbose_name_plural': 'پرسنل',
            },
        ),
    ]
