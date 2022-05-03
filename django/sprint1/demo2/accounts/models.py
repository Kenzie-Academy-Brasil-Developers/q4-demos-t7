from uuid import uuid4

from django.db import models


class Accounts(models.Model):
    user_uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    email = models.EmailField(unique=True)
    birthdate = models.DateField(null=True)
    account_balance = models.FloatField(default=0)
    password = models.CharField(max_length=255)


#  exemplo de model
# class MyModel(models.Model):
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)


# 1. auto_now_add: seta automaticamente o 'now' na primeira criação do objeto:
#   1.1. DateField: o default vem do datetime.date.today()
#   1.2. DateTimeField: o default vem do django.utils.timezone.now()

# 2. auto_now: seta automaticamente o 'now' sempre que o objeto for salvado.
