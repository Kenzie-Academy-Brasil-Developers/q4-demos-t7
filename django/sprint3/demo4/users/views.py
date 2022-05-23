from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.generics import (ListCreateAPIView,
                                     RetrieveUpdateDestroyAPIView)
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import Request, Response

from demo.exceptions import CustomException
from demo.pagination import PaginationResult
from users.models import Users
from users.permissions import CreateSuperuser, IsAuthenticated
from users.serializers import LoginSerializer, UserSerializer


class UserView(ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [CreateSuperuser]

    serializer_class = UserSerializer
    queryset = Users.objects.filter(is_superuser=False)

    pagination_class = PaginationResult

    def paginate_queryset(self, queryset):
        return super().paginate_queryset(queryset.all())

    def get(self, request, *args, **kwargs):
        if request.user.is_superuser:
            self.queryset = Users.objects
            return super().get(request, *args, **kwargs)

        return super().get(request, *args, **kwargs)


class UserUUIDView(RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = UserSerializer
    queryset = Users.objects

    lookup_field = "user_uuid"

    def get(self, request, *args, **kwargs):
        user: Users = Users.objects.get(pk=kwargs.get("user_uuid"))

        if request.user != user and not request.user.is_superuser:
            serializer = self.get_serializer(request.user)

            return Response(serializer.data, HTTP_200_OK)

        return super().get(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        user: Users = Users.objects.get(pk=kwargs.get("user_uuid"))

        if request.user != user and not request.user.is_superuser:
            raise CustomException("You can't change another user information.")

        return super().patch(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        user: Users = Users.objects.get(pk=kwargs.get("user_uuid"))

        if request.user != user and not request.user.is_superuser:
            raise CustomException("You can't delte another user.")

        return super().delete(request, *args, **kwargs)


@api_view(["POST"])
def login_view(request: Request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user: Users = authenticate(**serializer.validated_data)

    if not user:
        return Response({"detail": "Invalid credentials."}, HTTP_400_BAD_REQUEST)

    token, _ = Token.objects.get_or_create(user=user)

    return Response({"token": token.key}, HTTP_200_OK)
