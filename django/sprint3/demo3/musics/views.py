from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import CreateAPIView

from demo.permissions import IsAdminOrReadyOnly
from musics.serializers import MusicSerializer


class MusicView(CreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminOrReadyOnly]

    serializer_class = MusicSerializer
