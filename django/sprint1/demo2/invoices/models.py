from uuid import uuid4

from django.db import models


class Invoices(models.Model):
    invoice_uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    release_date = models.DateField()
    invoice_number = models.CharField(max_length=65, unique=True)
    order = models.OneToOneField("orders.Orders", null=True, on_delete=models.CASCADE)
