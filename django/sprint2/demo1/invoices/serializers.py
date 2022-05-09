from rest_framework import serializers

from orders.serializers import GetOrderSerializer

class OrderUUIDSerializer(serializers.Serializer):
    order_uuid = serializers.UUIDField()


class InvoiceSerializer(serializers.Serializer):
    invoice_uuid = serializers.UUIDField()
    release_date = serializers.DateField()
    invoice_number = serializers.UUIDField()
    order = GetOrderSerializer()
