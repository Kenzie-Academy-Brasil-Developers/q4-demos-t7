from rest_framework.permissions import BasePermission
from rest_framework.request import Request


class Authenticated(BasePermission):
    def has_permission(self, request: Request, _):
        restrict_methods = ("GET",)

        if request.method in restrict_methods and not request.user.is_authenticated:
            return False

        return True
