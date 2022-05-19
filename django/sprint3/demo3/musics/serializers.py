from rest_framework import serializers

from genres.serializers import GenreSerializer
from musics.models import Musics
from bands.models import Bands
from genres.models import Genres


class MusicSerializer(serializers.ModelSerializer):
    genres = GenreSerializer()

    class Meta:
        model = Musics
        fields = "__all__"

    def validate(self, attrs):
        band = attrs["band"]
        foundBand = Bands.objects.filter(name__icontains=band).first()

        if not foundBand:
            return False

        attrs["band"] = band.band_uuid

        genres = attrs["genres"].lower()
        foundGenre, _ = Genres.objects.get_or_create(name=genres)
        attrs["genres"] = foundGenre

        return super().validate(attrs)
