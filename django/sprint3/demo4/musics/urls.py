from django.urls import path

from musics.views import MusicView

urlpatterns = [
    path("musics/", MusicView.as_view()),
]
