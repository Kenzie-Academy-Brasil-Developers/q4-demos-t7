from uuid import uuid4

from django.db import models


class Accounts(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=40, null=True)
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=60, null=True)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
