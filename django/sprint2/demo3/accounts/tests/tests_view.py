from faker import Faker
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import Accounts


class AccountsViewTest(APITestCase):
    def test_create_user(self) -> None:
        user_data = {"username": "username", "password": "1234"}
        response = self.client.post("/api/register/", user_data)

        self.assertEqual(response.status_code, 201)
        self.assertNotIn("password", response.json())

    def test_create_user_fail(self) -> None:
        user_data = {"username": "username"}
        response = self.client.post("/api/register/", user_data)

        self.assertEqual(response.status_code, 400)
        self.assertIn("password", response.json())


class LoginViewTest(APITestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        fake = Faker()
        cls.user_data = {
            "username": fake.first_name(),
            "password": "".join(fake.random_letters(length=15)),
        }

    def setUp(self) -> None:
        Accounts.objects.create_user(**self.user_data)

    def test_login(self) -> None:
        response = self.client.post("/api/login/", self.user_data)

        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json())

    def test_login_fail_invalid_credentials(self):
        response = self.client.post(
            "/api/login/", {"username": self.user_data["username"], "password": "1234"}
        )

        self.assertEqual(response.status_code, 401)
        self.assertDictEqual(response.json(), {"message": "Invalid credentials."})

    def test_login_fail_invalid_body(self):
        response = self.client.post(
            "/api/login/", {"username": self.user_data["username"]}
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("password", response.json())
