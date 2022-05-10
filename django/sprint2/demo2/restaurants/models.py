from uuid import uuid4
from django.db import models


class Restaurants(models.Model):
    restaurant_uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=50)
    owner = models.ForeignKey("accounts.Accounts", on_delete=models.CASCADE)
