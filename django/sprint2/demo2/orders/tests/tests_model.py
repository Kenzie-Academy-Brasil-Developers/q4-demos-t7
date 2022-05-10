from math import prod
import uuid
from django.test import TestCase

from accounts.models import Accounts
from orders.models import OrderProducts, Orders
from products.models import Products
from restaurants.models import Restaurants


class OrderModelTest(TestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        cls.username = "user"
        cls.password = "1234"
        cls.user_obj = Accounts.objects.create_user(
            username=cls.username, password=cls.password
        )

        cls.total_price = 100
        cls.order_obj = Orders.objects.create(
            total_price=cls.total_price, client=cls.user_obj
        )

    def test_order_fields(self):
        self.assertIsInstance(self.order_obj.total_price, int)
        self.assertEqual(self.order_obj.total_price, self.total_price)

        self.assertIsInstance(self.order_obj.order_uuid, uuid.UUID)

        self.assertIsInstance(self.order_obj.client, Accounts)

    def test_order_products_relationship(self):
        restaurant_name = "restaurant"

        restaurant = Restaurants.objects.create(
            name=restaurant_name, owner=self.user_obj
        )

        products = [
            Products.objects.create(
                name=f"product {index}",
                description=f"description {index}",
                price=10 * index + 1,
                available=True,
                restaurant=restaurant,
            )
            for index in range(10)
        ]

        for product in products:
            OrderProducts.objects.create(
                product=product,
                order=self.order_obj,
                unit_price=product.price,
                quantity=3,
            )

        self.assertEqual(self.order_obj.products.count(), len(products))
