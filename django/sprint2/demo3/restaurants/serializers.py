from rest_framework import serializers
from accounts.serializers import AccountSerializer


class RestaurantSerializer(serializers.Serializer):
    name = serializers.CharField()
    owner = AccountSerializer(read_only=True)
