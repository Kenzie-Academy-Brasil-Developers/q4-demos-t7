from django.urls import path

from users.views import UserView, login_view

urlpatterns = [
    path("users/", UserView.as_view()),
    path("login/", login_view),
]
