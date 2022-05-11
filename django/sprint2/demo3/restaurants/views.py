from rest_framework.authentication import TokenAuthentication
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED
from rest_framework.views import APIView, Request, Response

from restaurants.models import Restaurants
from restaurants.serializers import RestaurantSerializer
from restaurants.permissions import IsAdminOrReadOnly


class RestaurantView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminOrReadOnly]

    def get(self, _: Request):
        restaurants = Restaurants.objects.all()
        serializer = RestaurantSerializer(restaurants, many=True)

        return Response({"restaurants": serializer.data}, HTTP_200_OK)

    def post(self, request: Request):
        serializer = RestaurantSerializer(data=request.data)
        serializer.is_valid(True)

        restaurant = Restaurants.objects.create(
            **serializer.validated_data, owner=request.user
        )

        serializer = RestaurantSerializer(restaurant)

        return Response(serializer.data, HTTP_201_CREATED)
