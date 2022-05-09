from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK, HTTP_409_CONFLICT
from rest_framework.authentication import TokenAuthentication

# from rest_framework.permissions import IsAdminUser

from products.models import Products
from products.serializers import DeleteProductSerializer, ProductSerializer
from products.permissions import IsAdmin


class ProductView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdmin]

    def post(self, request: Request):
        serializer = ProductSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)

        # try:
        found_products = [
            Products.objects.filter(name=product["name"]).first()
            for product in serializer.validated_data
            if Products.objects.filter(name=product["name"]).exists()
        ]

        if found_products:
            return Response(
                {
                    "message": "Product(s) name(s) already exists",
                    "products": [product.name for product in found_products],
                },
                HTTP_409_CONFLICT,
            )

        products = Products.objects.bulk_create(
            [Products(**data) for data in serializer.validated_data]
        )

        serializer = ProductSerializer(products, many=True)

        return Response({"products": serializer.data}, HTTP_201_CREATED)

        # except IntegrityError as err:
        #     print(err)
        #     return Response({"stts": "ok =D"})

    def get(self, _: Request):
        products = Products.objects.all()
        seriazer = ProductSerializer(products, many=True)

        return Response({"products": seriazer.data}, HTTP_200_OK)

    def delete(self, request: Request):
        serializer = DeleteProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product = get_object_or_404(
            Products, pk=serializer.validated_data["product_uuid"]
        )

        serializer = ProductSerializer(product)

        product.delete()

        return Response(
            {"message": "product deleted", "product": serializer.data}, HTTP_200_OK
        )
