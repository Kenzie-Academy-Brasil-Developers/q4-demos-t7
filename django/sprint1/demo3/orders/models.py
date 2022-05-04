from uuid import uuid4

from django.db import models


class Orders(models.Model):
    order_uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    order_date = models.DateField(auto_now_add=True)

    customer = models.ForeignKey(
        "accounts.Accounts", on_delete=models.CASCADE, related_name="orders"
    )
    products = models.ManyToManyField(
        "products.Products", related_name="orders", through="orders.OrderProducts"
    )


class OrderProducts(models.Model):
    register_uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    order = models.ForeignKey("orders.Orders", on_delete=models.CASCADE)
    products = models.ForeignKey("products.Products", on_delete=models.CASCADE)
    value = models.FloatField()
