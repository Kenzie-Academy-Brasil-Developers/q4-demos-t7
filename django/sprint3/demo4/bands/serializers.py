from rest_framework import serializers
from bands.models import Bands


class BandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bands
        fields = "__all__"

    def validate(self, attrs):
        attrs["name"] = attrs["name"].title()
        return super().validate(attrs)
