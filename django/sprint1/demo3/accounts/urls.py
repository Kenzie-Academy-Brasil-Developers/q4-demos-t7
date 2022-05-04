from django.urls import path

from accounts.views import AccountsView, login_view

urlpatterns = [
    path("accounts/", AccountsView.as_view()),
    path("login/", login_view)
]
