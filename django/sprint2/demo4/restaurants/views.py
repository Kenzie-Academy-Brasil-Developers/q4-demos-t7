from rest_framework.authentication import TokenAuthentication
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED
from rest_framework.views import Request, Response
from rest_framework.generics import ListCreateAPIView

from restaurants.models import Restaurants
from restaurants.serializers import RestaurantSerializer
from restaurants.permissions import IsAdminOrReadOnly


class RestaurantView(ListCreateAPIView):
    queryset = Restaurants.objects.all()
    serializer_class = RestaurantSerializer

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminOrReadOnly]

    def get(self, _: Request):
        serializer = self.get_serializer(self.queryset.all(), many=True)
        return Response({"restaurants": serializer.data}, HTTP_200_OK)
