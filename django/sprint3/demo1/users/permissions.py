from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import BasePermission
from rest_framework.views import Request

from users.models import Users


class CreateSuperuser(BasePermission):
    def has_permission(self, request: Request, _):
        user: Users = request.user
        is_superuser: bool = request.data.get("is_superuser", False)

        if is_superuser and (not user.is_authenticated or not user.is_superuser):
            # request.data["is_superuser"] = False
            # return True
            raise PermissionDenied("Only admin can create a superuser.")

        return True
