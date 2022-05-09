from uuid import uuid4

from django.db import models


class Products(models.Model):
    product_uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    description = models.CharField(max_length=1023, null=True)
    unit_value = models.FloatField()

    class Meta:
        verbose_name_plural = "Products"

    def __str__(self):
        return self.name
