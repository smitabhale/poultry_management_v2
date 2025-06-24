from django.contrib import admin
from .models import Flock, Batch, DailyEntry

admin.site.register(Flock)
admin.site.register(Batch)
admin.site.register(DailyEntry)

