from rest_framework import serializers

from genres.models import Genres


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genres
        fields = "__all__"

    def validate(self, attrs):
        attrs["name"] = attrs["name"].lower()

        return super().validate(attrs)
