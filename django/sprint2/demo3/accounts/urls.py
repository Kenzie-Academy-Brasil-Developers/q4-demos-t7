from django.urls import path
from accounts.views import login_view, AccountsView


urlpatterns = [
    path("login/", login_view),
    path("register/", AccountsView.as_view()),
]
