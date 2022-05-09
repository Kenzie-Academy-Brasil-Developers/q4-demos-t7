from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND,
)
from invoices.models import Invoices

from invoices.serializers import InvoiceSerializer, OrderUUIDSerializer
from orders.models import Orders


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def post_invoice(request: Request, order_uuid: str):
    serializer = OrderUUIDSerializer(data={"order_uuid": order_uuid})
    if not serializer.is_valid():
        return Response(
            {"message": "URL parameter must be a valid UUID"}, HTTP_400_BAD_REQUEST
        )

    try:
        order = get_object_or_404(Orders, pk=order_uuid)

        if order.customer != request.user:
            return Response(
                {"message": "This order doesn't belong to you."}, HTTP_403_FORBIDDEN
            )

        invoice, _ = Invoices.objects.get_or_create(order=order)
        serializer = InvoiceSerializer(invoice)

        return Response(serializer.data, HTTP_200_OK)

    except Http404:
        return Response({"message": "Order not found."}, HTTP_404_NOT_FOUND)


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_invoice(request: Request):
    user_orders = request.user.orders.all()
    invoices = [Invoices.objects.filter(order=order).first() for order in user_orders]
    invoices = [invoice for invoice in invoices if invoice]

    serializer = InvoiceSerializer(invoices, many=True)

    return Response(serializer.data, HTTP_200_OK)
