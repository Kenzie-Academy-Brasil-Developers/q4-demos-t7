from rest_framework import serializers


class ProductSerializer(serializers.Serializer):
    product_uuid = serializers.CharField(read_only=True)
    name = serializers.CharField()
    description = serializers.CharField(required=False)
    unit_value = serializers.FloatField()
