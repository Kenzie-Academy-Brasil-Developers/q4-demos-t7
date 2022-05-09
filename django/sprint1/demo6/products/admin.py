from django.contrib import admin
from django.contrib.admin import ModelAdmin
from .models import Products

# Register your models here.

@admin.register(Products)
class ProductsAdmin(ModelAdmin):
    ...
