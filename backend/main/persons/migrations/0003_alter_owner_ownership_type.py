# Generated by Django 5.0.4 on 2024-12-21 10:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('persons', '0002_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='owner',
            name='ownership_type',
            field=models.CharField(blank=True, max_length=10, null=True, verbose_name='نوع مالکیت'),
        ),
    ]
