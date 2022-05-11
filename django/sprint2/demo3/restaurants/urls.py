from django.urls import path

from restaurants.views import RestaurantView


urlpatterns = [
    path("restaurants/", RestaurantView.as_view()),
]
