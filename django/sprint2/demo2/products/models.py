from uuid import uuid4
from django.db import models


class Products(models.Model):
    product_uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=50)
    description = models.TextField()
    price = models.IntegerField()
    available = models.BooleanField()
    restaurant = models.ForeignKey("restaurants.Restaurants", on_delete=models.PROTECT)
