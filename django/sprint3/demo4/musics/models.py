from uuid import uuid4

from django.db import models


class Musics(models.Model):
    music_uuid = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    name = models.CharField(max_length=100)

    band = models.ForeignKey(
        "bands.Bands", on_delete=models.PROTECT, related_name="musics"
    )

    genres = models.ManyToManyField("genres.Genres", related_name="musics")
