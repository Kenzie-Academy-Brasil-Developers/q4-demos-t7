from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from bands.models import Bands
from bands.serializers import BandSerializer
from demo.pagination import PaginationResult
from demo.permissions import IsAdminOrReadyOnly


class BandView(ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminOrReadyOnly]

    queryset = Bands.objects
    serializer_class = BandSerializer

    pagination_class = PaginationResult

    def paginate_queryset(self, queryset):
        return super().paginate_queryset(queryset.all())


class BandUUIDView(RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminOrReadyOnly]

    queryset = Bands.objects
    serializer_class = BandSerializer

    pagination_class = PaginationResult

    lookup_field = "band_uuid"

    def paginate_queryset(self, queryset):
        return super().paginate_queryset(queryset.all())
