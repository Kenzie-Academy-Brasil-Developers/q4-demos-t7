from uuid import uuid4

from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class AccountsManager(BaseUserManager):

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):

        if not email:
            raise ValueError('The given email must set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password = None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)
    
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('SUperuser must have is_staff=True')
        
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('SUperuser must have is_superuser=True')

        return self._create_user(email, password, **extra_fields)

class Accounts(AbstractUser):
    user_uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    email = models.EmailField(unique=True)
    birthdate = models.DateField(null=True)
    username = None
    account_balance = models.FloatField(default=0)
    # password = models.CharField(max_length=255)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['birthdate']

    objects = AccountsManager()


#  exemplo de model
# class MyModel(models.Model):
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)


# 1. auto_now_add: seta automaticamente o 'now' na primeira criação do objeto:
#   1.1. DateField: o default vem do datetime.date.today()
#   1.2. DateTimeField: o default vem do django.utils.timezone.now()

# 2. auto_now: seta automaticamente o 'now' sempre que o objeto for salvado.
