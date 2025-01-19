from rest_framework.viewsets import ModelViewSet
from .serializers import PostSerializer
from ..models import Post

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer