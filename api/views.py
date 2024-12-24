from rest_framework.viewsets import ModelViewSet
from .models import Project, Reference, Subscriber, Blog, BlogComment
from .serializers import (
    ProjectSerializer,
    ReferenceSerializer,
    SubscriberSerializer,
    BlogSerializer,
    BlogCommentSerializer
)

class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ReferenceViewSet(ModelViewSet):
    queryset = Reference.objects.all()
    serializer_class = ReferenceSerializer

class SubscriberViewSet(ModelViewSet):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer

class BlogViewSet(ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class BlogCommentViewSet(ModelViewSet):
    queryset = BlogComment.objects.all()
    serializer_class = BlogCommentSerializer
