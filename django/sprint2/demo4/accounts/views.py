from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_401_UNAUTHORIZED
from rest_framework.views import Request, Response
from rest_framework.generics import GenericAPIView

from accounts.models import Accounts
from accounts.serializers import AccountSerializer, LoginSerializer


class AccountsView(GenericAPIView):
    serializer_class = AccountSerializer

    def post(self, request: Request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(True)
        serializer.save()

        return Response(serializer.data, HTTP_201_CREATED)


@api_view(["POST"])
def login_view(request: Request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(True)

    user = authenticate(**serializer.validated_data)

    if not user:
        return Response({"message": "Invalid credentials."}, HTTP_401_UNAUTHORIZED)

    token, _ = Token.objects.get_or_create(user=user)

    return Response({"token": token.key}, HTTP_200_OK)
