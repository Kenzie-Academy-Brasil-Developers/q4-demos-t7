from uuid import uuid4
from django.db import models


class Orders(models.Model):
    order_uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    total_price = models.IntegerField()
    client = models.ForeignKey(
        "accounts.Accounts", related_name="orders", on_delete=models.PROTECT
    )
    products = models.ManyToManyField(
        "products.Products", related_name="orders", through="orders.OrderProducts"
    )


class OrderProducts(models.Model):
    order = models.ForeignKey("orders.Orders", on_delete=models.PROTECT)
    product = models.ForeignKey("products.Products", on_delete=models.PROTECT)
    unit_price = models.IntegerField()
    quantity = models.IntegerField()
