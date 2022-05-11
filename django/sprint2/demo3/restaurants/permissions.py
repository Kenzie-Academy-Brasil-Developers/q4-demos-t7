from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, _):
        if request.method in SAFE_METHODS:
            return True

        return request.user.is_superuser
