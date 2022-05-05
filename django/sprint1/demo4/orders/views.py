from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND
from orders.models import OrderProducts, Orders

from orders.serializers import OrderProductSerializer, OrderSerializer
from products.models import Products


class OrderView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request: Request):
        serializer = OrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            order: Orders = Orders.objects.create(customer=request.user)

            for product_uuid in serializer.validated_data["products_uuid"]:

                product = get_object_or_404(Products, pk=product_uuid)

                OrderProducts.objects.create(
                    order=order, product=product, value=product.unit_value
                )

            order_products = OrderProducts.objects.filter(order=order).all()
            serializer = OrderProductSerializer(order_products, many=True)

            return Response(serializer.data, HTTP_201_CREATED)
        except Http404:
            return Response({"message": "invalid product list"}, HTTP_404_NOT_FOUND)
