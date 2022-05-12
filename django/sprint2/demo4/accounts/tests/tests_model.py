import uuid

from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import AbstractUser
from django.test import TestCase

from accounts.models import Accounts


class AccountsModelTest(TestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        cls.username = "username"
        cls.password = "1234"
        cls.user_obj = Accounts.objects.create_user(
            username=cls.username, password=cls.password
        )

    def test_user_fields(self):
        self.assertIsInstance(self.user_obj.username, str)
        self.assertEqual(self.user_obj.username, self.username)

        self.assertIsInstance(self.user_obj.password, str)
        self.assertTrue(check_password(self.password, self.user_obj.password))

        self.assertIsInstance(self.user_obj.user_uuid, uuid.UUID)

        self.assertIsInstance(self.user_obj, AbstractUser)
