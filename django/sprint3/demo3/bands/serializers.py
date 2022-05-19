from rest_framework import serializers

from bands.models import Bands
from musics.serializers import MusicSerializer


class BandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bands
        fields = "__all__"

    def validate(self, attrs):
        attrs["name"] = attrs["name"].title()
        return super().validate(attrs)


class BandUUIDSerializer(serializers.ModelSerializer):
    musics = MusicSerializer(many=True)

    class Meta:
        model = Bands
        fields = "__all__"
