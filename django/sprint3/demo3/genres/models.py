from uuid import uuid4

from django.db import models


class Genres(models.Model):
    genre_uuid = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    name = models.CharField(max_length=60, unique=True)
