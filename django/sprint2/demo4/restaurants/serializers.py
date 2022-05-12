from rest_framework import serializers
from accounts.serializers import AccountSerializer
from restaurants.models import Restaurants


class RestaurantSerializer(serializers.ModelSerializer):
    owner = AccountSerializer(read_only=True)

    class Meta:
        model = Restaurants
        fields = "__all__"

    def create(self, validated_data):
        request = self.context["request"]
        return Restaurants.objects.create(**validated_data, owner=request.user)
