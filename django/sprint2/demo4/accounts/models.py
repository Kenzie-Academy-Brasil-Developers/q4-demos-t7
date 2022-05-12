from uuid import uuid4

from django.contrib.auth.models import AbstractUser
from django.db import models


class Accounts(AbstractUser):
    user_uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)
