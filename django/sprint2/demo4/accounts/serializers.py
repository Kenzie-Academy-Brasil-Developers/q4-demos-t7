from rest_framework import serializers

from accounts.models import Accounts


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accounts
        fields = [
            "user_uuid",
            "username",
            "password",
            "is_staff",
            "is_superuser",
            "date_joined",
        ]

        extra_kwargs = {
            "user_uuid": {"read_only": True},
            "password": {"write_only": True},
            "date_joined": {"read_only": True, "format": "%d/%m/%Y %H:%M:%S"},
        }

    def create(self, validated_data):
        return Accounts.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
