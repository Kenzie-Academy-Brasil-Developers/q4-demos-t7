from rest_framework import serializers


class AccountsSerializer(serializers.Serializer):
    user_uuid = serializers.CharField(read_only=True)
    email = serializers.EmailField()
    birthdate = serializers.DateField(required=False)
    account_balance = serializers.FloatField(required=False)
    password = serializers.CharField(write_only=True)
