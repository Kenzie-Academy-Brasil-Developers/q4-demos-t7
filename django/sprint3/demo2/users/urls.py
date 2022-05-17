from django.urls import path

from users.views import UserUUIDView, UserView, login_view

urlpatterns = [
    path("users/", UserView.as_view()),
    path("users/<user_uuid>/", UserUUIDView.as_view()),
    path("login/", login_view),
]
