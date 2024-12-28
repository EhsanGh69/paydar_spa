from django.contrib import admin

from .models import Personnel, Owner, Contractor

admin.site.register(Personnel)

admin.site.register(Owner)

admin.site.register(Contractor)
