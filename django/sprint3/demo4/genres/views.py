from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import DestroyAPIView, ListCreateAPIView

from demo.pagination import PaginationResult
from demo.permissions import IsAdminOrReadyOnly
from genres.models import Genres
from genres.serializers import GenreSerializer


class GenreView(ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminOrReadyOnly]

    queryset = Genres.objects
    serializer_class = GenreSerializer

    pagination_class = PaginationResult

    def paginate_queryset(self, queryset):
        return super().paginate_queryset(queryset.all())

    def get(self, request, *args, **kwargs):
        query_params = request.GET.get("name", False)

        if query_params:
            self.queryset = Genres.objects.filter(name__icontains=query_params)
            # __icontains = ilike
            # __contains = like


        return super().get(request, *args, **kwargs)


class GenreUUIDView(DestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminOrReadyOnly]

    queryset = Genres.objects
    serializer_class = GenreSerializer

    lookup_field = "genre_uuid"