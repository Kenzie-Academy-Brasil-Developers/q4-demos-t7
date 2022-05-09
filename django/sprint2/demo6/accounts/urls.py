from django.urls import path

from accounts.views import AccountsView, login_view, update_account_balance

urlpatterns = [
    path("accounts/", AccountsView.as_view()),
    path("login/", login_view),
    path("accounts/account_balance/", update_account_balance)
]
