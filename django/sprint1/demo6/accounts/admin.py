from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Accounts
from django.contrib.auth.models import Group

admin.site.unregister(Group)

# Register your models here.

@admin.register(Accounts)
class AccountsAdmin(UserAdmin):

    fieldsets = (
        ("Pedro Info", {
            "fields": (
                ('email'),
            ),
        }),
        ('Personal Info', {
            "fields": (
                ('account_balance', 'birthdate')
            ),
        }),
        ('Permissions', {
            "fields": (
                ('is_active', 'is_staff', 'is_superuser', 'user_permissions')
            ),
        })
    )
    

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'birthdate', 'account_balance'),
        }),
    )
    

    list_display = ('email', 'birthdate', 'account_balance', 'is_staff')
    search_fields = ('email','birthdate')
    ordering = ('email',)
