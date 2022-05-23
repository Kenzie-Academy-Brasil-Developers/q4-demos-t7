from rest_framework import serializers
from bands.serializers import BandSerializer
from genres.serializers import GenreSerializer

from musics.models import Musics


class MusicCreatedSerializer(serializers.Serializer):
    name = serializers.CharField()
    band = BandSerializer()
    genres = GenreSerializer(many=True)


class MusicSerializer(serializers.ModelSerializer):
    band = serializers.CharField()
    genres = serializers.ListField(child=serializers.CharField())

    class Meta:
        model = Musics
        fields = "__all__"
