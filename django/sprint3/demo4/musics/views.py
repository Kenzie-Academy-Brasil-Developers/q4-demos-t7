from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import ListCreateAPIView
from bands.models import Bands

from demo.permissions import IsAdminOrReadyOnly
from demo.exceptions import CustomException
from demo.pagination import PaginationResult
from genres.models import Genres
from musics.serializers import MusicSerializer, MusicCreatedSerializer
from musics.models import Musics


class MusicView(ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminOrReadyOnly]

    serializer_class = MusicSerializer
    queryset = Musics.objects

    pagination_class = PaginationResult

    def paginate_queryset(self, queryset):
        return super().paginate_queryset(queryset.all())

    def list(self, request, *args, **kwargs):
        self.serializer_class = MusicCreatedSerializer
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        try:
            band = serializer.data.get("band")
            foundBand = get_object_or_404(Bands, name__icontains=band)

            genres = serializer.data.get("genres")
            foundGenres = [
                Genres.objects.get_or_create(name=genre.lower())[0] for genre in genres
            ]

            music_name = serializer.data.get("name")

            music = Musics.objects.create(name=music_name, band=foundBand)
            music.genres.set(foundGenres)

        except Http404:
            raise CustomException(detail="Band not found", code=404)
