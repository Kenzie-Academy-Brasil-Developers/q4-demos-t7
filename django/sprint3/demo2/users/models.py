import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models


class Users(AbstractUser):
    user_uuid = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
