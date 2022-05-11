from faker import Faker
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import Accounts
from restaurants.models import Restaurants


class RestaurantViewTest(APITestCase):
    def setUp(self) -> None:
        fake = Faker()
        self.commum_user = Accounts.objects.create_user(
            {
                "username": fake.first_name(),
                "password": "".join(fake.random_letters(length=15)),
            }
        )

        self.admin_user = Accounts.objects.create_superuser(
            {
                "username": fake.first_name(),
                "password": "".join(fake.random_letters(length=15)),
            }
        )

    def test_list_restaurant(self):
        response = self.client.get("/api/restaurants/")

        self.assertEqual(response.status_code, 200)
        self.assertIn("restaurants", response.json())
        self.assertEqual(len(response.json()["restaurants"]), 0)

        for _ in range(10):
            Restaurants.objects.create(name=Faker().company, owner=self.admin_user)

        response = self.client.get("/api/restaurants/")
        self.assertEqual(len(response.json()["restaurants"]), 10)

    def test_admin_can_create_restaurant(self):
        token = Token.objects.create(user=self.admin_user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {token}")

        response = self.client.post("/api/restaurants/", {"name": "restaurant"})

        self.assertEqual(response.status_code, 201)

    def test_user_can_not_create_restaurant(self):
        token = Token.objects.create(user=self.commum_user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {token}")

        response = self.client.post("/api/restaurants/", {"name": "restaurant"})

        self.assertEqual(response.status_code, 403)
