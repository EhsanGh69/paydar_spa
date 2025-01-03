# Generated by Django 5.0.4 on 2024-12-27 07:46

import django_jalali.db.models
import persons.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('persons', '0003_alter_owner_ownership_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contractor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(blank=True, max_length=250, null=True, verbose_name='نام شرکت')),
                ('phone', models.CharField(blank=True, max_length=20, null=True, verbose_name='شماره تماس')),
                ('office_address', models.TextField(blank=True, null=True, verbose_name='آدرس دفتر شرکت')),
                ('capabilities', models.TextField(blank=True, null=True, verbose_name='توانمندی ها')),
                ('registration_id', models.CharField(blank=True, max_length=10, null=True, verbose_name='شناسه ثبت')),
                ('license_image', models.ImageField(blank=True, null=True, upload_to=persons.models.license_image_path, verbose_name='تصویر مجوز فعالیت')),
                ('financial_strength', models.PositiveBigIntegerField(blank=True, null=True, verbose_name='توان مالی')),
                ('created_time', django_jalali.db.models.jDateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')),
                ('updated_time', django_jalali.db.models.jDateTimeField(auto_now=True, verbose_name='تاریخ ویرایش')),
            ],
            options={
                'verbose_name': 'پیمانکار',
                'verbose_name_plural': 'پیمانکاران',
            },
        ),
    ]
