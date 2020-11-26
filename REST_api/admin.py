from django.contrib import admin

from .models import Diary, URLS

# Register your models here.
admin.site.register(Diary)
admin.site.register(URLS)