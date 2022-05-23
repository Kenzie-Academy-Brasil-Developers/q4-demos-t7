from rest_framework import serializers

from demo.exceptions import CustomException
from users.models import Users


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = (
            "user_uuid",
            "username",
            "password",
            "is_superuser",
        )

        extra_kwargs = {
            "user_uuid": {"read_only": True},
            "password": {"write_only": True},
            "is_superuser": {"required": False, "default": False},
        }

    def validate(self, attrs):
        user: Users = self.context["request"].user
        if user.is_authenticated and not user.is_superuser:
            # attrs["is_superuser"] = False
            raise CustomException(code=403)

        attrs["username"] = attrs["username"].title()

        return super().validate(attrs)

    def create(self, validated_data):
        if validated_data["is_superuser"]:
            return Users.objects.create_superuser(**validated_data)

        return Users.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        attrs["username"] = attrs["username"].title()

        return super().validate(attrs)
