"""
Serializers for converting Django models to JSON and validating data for API endpoints.
This module includes serializers for the following models:
- Project
- Reference
- Subscriber
- Blog
- BlogComment
"""

from rest_framework import serializers

from .models import Project, Reference, Subscriber, Blog, BlogComment


class ProjectSerializer(serializers.ModelSerializer):
    """
    Serializer for the Project model.
    Converts Project instances to JSON and validates incoming data.
    """

    class Meta:
        model = Project
        fields = "__all__"


class ReferenceSerializer(serializers.ModelSerializer):
    """
    Serializer for the Reference model.
    Converts Reference instances to JSON and validates incoming data.
    """

    class Meta:
        model = Reference
        fields = "__all__"


class SubscriberSerializer(serializers.ModelSerializer):
    """
    Serializer for the Subscriber model.
    Converts Subscriber instances to JSON and validates incoming data.
    """

    class Meta:
        model = Subscriber
        fields = "__all__"


class BlogSerializer(serializers.ModelSerializer):
    """
    Serializer for the Blog model.
    Converts Blog instances to JSON and validates incoming data.
    """

    class Meta:
        model = Blog
        fields = "__all__"


class BlogCommentSerializer(serializers.ModelSerializer):
    """
    Serializer for the BlogComment model.
    Converts BlogComment instances to JSON and validates incoming data.
    """

    class Meta:
        model = BlogComment
        fields = "__all__"
