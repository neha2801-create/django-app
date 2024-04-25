from django.contrib import admin
from .models import Canvas

class CanvasAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'title', 'created_at')

admin.site.register(Canvas, CanvasAdmin)
