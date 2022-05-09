from rest_framework import serializers

from accounts.serializers import AccountsSerializer
from products.serializers import ProductSerializer


class OrderSerializer(serializers.Serializer):
    products_uuid = serializers.ListField(child=serializers.UUIDField())


class OrderUserSerializer(serializers.Serializer):
    order_uuid = serializers.CharField(read_only=True)
    order_date = serializers.DateField(read_only=True)

    user = AccountsSerializer(source="customer")


class OrderProductSerializer(serializers.Serializer):
    register_uuid = serializers.CharField(read_only=True)
    order = OrderUserSerializer()
    product = ProductSerializer()
    value = serializers.FloatField()


class GetOrderSerializer(serializers.Serializer):
    order_uuid = serializers.UUIDField(read_only=True)
    order_date = serializers.DateField(read_only=True)
    products = ProductSerializer(many=True)
