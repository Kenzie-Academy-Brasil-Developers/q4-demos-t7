from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from products.models import Products
from products.serializers import ProductSerializer


class ProductView(APIView):
    def post(self, request: Request):
        serializer = ProductSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)

        products = Products.objects.bulk_create(
            [Products(**data) for data in serializer.validated_data]
        )

        serializer = ProductSerializer(products, many=True)

        return Response({"products": serializer.data}, status.HTTP_201_CREATED)
