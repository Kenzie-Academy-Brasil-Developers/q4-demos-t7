from django.urls import path

from bands.views import BandUUIDView, BandView

urlpatterns = [
    path("bands/", BandView.as_view()),
    path("bands/<band_uuid>/", BandUUIDView.as_view()),
]
