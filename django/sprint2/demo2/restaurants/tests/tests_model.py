import uuid
from django.test import TestCase
from accounts.models import Accounts
from restaurants.models import Restaurants


class RestaurantsTestModel(TestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        cls.username = "user"
        cls.password = "1234"
        cls.user_obj = Accounts.objects.create_user(
            username=cls.username, password=cls.password
        )

        cls.restaurant_name = "restaurant"
        cls.restaurant_obj = Restaurants.objects.create(
            name=cls.restaurant_name, owner=cls.user_obj
        )

    def test_restaurant_fields(self):
        self.assertIsInstance(self.restaurant_obj.name, str)
        self.assertEqual(self.restaurant_obj.name, self.restaurant_name)

        self.assertIsInstance(self.restaurant_obj.restaurant_uuid, uuid.UUID)

        self.assertIsInstance(self.restaurant_obj.owner, Accounts)
        self.assertEqual(self.restaurant_obj.owner.username, self.username)
