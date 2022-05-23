from django.urls import path

from genres.views import GenreUUIDView, GenreView

urlpatterns = [
    path("genres/", GenreView.as_view()),
    path("genres/<genre_uuid>/", GenreUUIDView.as_view()),
]
