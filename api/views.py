from django.db.models import QuerySet
from rest_framework import status
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle
from rest_framework.viewsets import ModelViewSet

from .models import (
    Project,
    Reference,
    Subscriber,
    Blog,
    BlogComment,
    AboutMe,
    ContactMe,
)
from .serializers import (
    ProjectSerializer,
    ReferenceSerializer,
    SubscriberSerializer,
    BlogSerializer,
    BlogCommentSerializer,
    AboutMeSerializer,
    ContactMeSerializer,
)


class ContactFormThrottle(UserRateThrottle):
    rate = "5/min"  # Allow 5 submissions per minute


class ProjectViewSet(ModelViewSet):
    queryset: QuerySet[Project] = Project.objects.all()
    serializer_class = ProjectSerializer


class ReferenceViewSet(ModelViewSet):
    queryset: QuerySet[Reference] = Reference.objects.all()
    serializer_class = ReferenceSerializer


class SubscriberViewSet(ModelViewSet):
    queryset: QuerySet[Subscriber] = Subscriber.objects.all()
    serializer_class = SubscriberSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get("email")
        if Subscriber.objects.filter(email=email).exists():
            return Response(
                {"detail": "This email is already subscribed."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().create(request, *args, **kwargs)


class BlogViewSet(ModelViewSet):
    queryset: QuerySet[Blog] = Blog.objects.all()
    serializer_class = BlogSerializer


class BlogCommentViewSet(ModelViewSet):
    queryset: QuerySet[BlogComment] = BlogComment.objects.all()
    serializer_class = BlogCommentSerializer

    def get_queryset(self):
        blog_id = self.request.query_params.get("blog_id")
        if blog_id:
            return self.queryset.filter(blog_id=blog_id)
        return self.queryset

    def create(self, request, *args, **kwargs):
        blog_id = request.data.get("blog")
        if not Blog.objects.filter(id=blog_id).exists():
            return Response(
                {"detail": "The specified blog does not exist."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().create(request, *args, **kwargs)


class AboutMeViewSet(ModelViewSet):
    queryset: QuerySet[AboutMe] = AboutMe.objects.all()
    serializer_class = AboutMeSerializer

    def get_queryset(self):
        return AboutMe.objects.all()[:1]  # Limit to the first AboutMe instance


class ContactMeViewSet(ModelViewSet):
    queryset: QuerySet[ContactMe] = ContactMe.objects.all()
    serializer_class = ContactMeSerializer
    throttle_classes = [ContactFormThrottle]
