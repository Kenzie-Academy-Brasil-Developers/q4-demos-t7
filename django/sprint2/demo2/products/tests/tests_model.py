import uuid
from django.test import TestCase

from accounts.models import Accounts
from restaurants.models import Restaurants
from products.models import Products


class ProductsModelTest(TestCase):
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

        cls.product_obj = Products.objects.create(
            name="product",
            description="description",
            price=10,
            available=True,
            restaurant=cls.restaurant_obj,
        )

    def test_product_fields(self):
        self.assertIsInstance(self.product_obj.product_uuid, uuid.UUID)
        self.assertIsInstance(self.product_obj.restaurant, Restaurants)
