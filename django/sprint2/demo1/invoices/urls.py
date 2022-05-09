from django.urls import path
from invoices.views import get_invoice, post_invoice


urlpatterns = [
    path("invoices/<order_uuid>/", post_invoice),
    path("invoices/", get_invoice),
]
