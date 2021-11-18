from django.contrib import admin
from . import models

class VariationAdmin(admin.ModelAdmin):
    list_display = ('name','product','price')

class OrderAdmin(admin.ModelAdmin):
    list_display = ('name','email','paid','shipped')

admin.site.register(models.Product)
admin.site.register(models.Order, OrderAdmin)
admin.site.register(models.Variation, VariationAdmin)