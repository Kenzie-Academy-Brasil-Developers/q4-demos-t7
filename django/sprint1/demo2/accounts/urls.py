from django.urls import path

from accounts.views import AccountsView

urlpatterns = [path("accounts/", AccountsView.as_view())]
