from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password, make_password
from django.db import IntegrityError
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_401_UNAUTHORIZED,
    HTTP_409_CONFLICT,
)
from rest_framework.authtoken.models import Token
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from accounts.models import Accounts
from accounts.serializers import (
    AccountsSerializer,
    LoginSerializer,
    PatchAccountSerializer,
    PutAccountBalanceSerializer,
)


class AccountsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = []

    def get(self, request: Request):
        serializer = AccountsSerializer(request.user)

        return Response(serializer.data, HTTP_200_OK)

    def post(self, request: Request):
        # request.data = body da requisição
        serializer = AccountsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        found_user = Accounts.objects.filter(
            email=serializer.validated_data["email"]
        ).exists()  # retorna um boleano

        if found_user:
            return Response({"message": "User already exists"}, HTTP_409_CONFLICT)

        user = Accounts.objects.create(**serializer.validated_data)
        user.set_password(serializer.validated_data["password"])
        user.save()

        serializer = AccountsSerializer(user)

        return Response(serializer.data, HTTP_201_CREATED)

    def patch(self, request: Request):
        serializer = PatchAccountSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            account = Accounts.objects.filter(pk=request.user.user_uuid)
            account.update(**serializer.validated_data)

            user = account.first()
            password = serializer.validated_data.get("password")

            if password:
                user.set_password(password)
                user.save()

            serializer = AccountsSerializer(user)
            return Response(serializer.data, HTTP_200_OK)

        except IntegrityError as err:
            if "unique" in str(err).lower():
                return Response({"message": "Email already exists."}, HTTP_409_CONFLICT)


@api_view(["PUT"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_account_balance(request: Request):
    serializer = PutAccountBalanceSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    request.user.account_balance += serializer.validated_data["account_balance"]
    request.user.save()

    serializer = AccountsSerializer(request.user)

    return Response(serializer.data, HTTP_200_OK)


@api_view(["POST"])
def login_view(request: Request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    # user: Accounts = Accounts.objects.filter(
    #     email=serializer.validated_data["email"]
    # ).first()

    user = authenticate(
        username=serializer.validated_data["email"],
        password=serializer.validated_data["password"],
    )

    if not user:
        return Response({"message": "Invalid credentials."}, HTTP_401_UNAUTHORIZED)

    # if not check_password(serializer.validated_data["password"], user.password):
    #     return Response(
    #         {"message": "Invalid credentials."}, HTTP_401_UNAUTHORIZED
    #     )

    token, _ = Token.objects.get_or_create(user=user)

    return Response({"token": token.key})
