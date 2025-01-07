"""
Serializers for converting Django models to JSON and validating data for API endpoints.
This module includes serializers for the following models:
- About Me
- Project
- Reference
- Subscriber
- Blog
- BlogComment
"""

from rest_framework import serializers


def sanitize_input(value: str) -> str:
    import bleach

    return bleach.clean(
        value, tags=[], attributes={}, strip=True
    )  # Allow only plain text


from .models import (
    Project,
    Reference,
    Subscriber,
    Blog,
    BlogComment,
    AboutMe,
    ContactMe,
)


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


class AboutMeSerializer(serializers.ModelSerializer):
    """
    Serializer for AboutMe model.
    converts AboutMe instance to JSON and validates incoming data.
    """

    class Meta:
        model = AboutMe
        fields = "__all__"


class ContactMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMe
        fields = [
            "id",
            "name",
            "email",
            "company",
            "message",
            "created_at",
        ]

    def validate_email(self, value):
        """
        Validate the email field to ensure it’s not from a disposable email service.
        """
        if "mailinator.com" in value.lower():
            raise serializers.ValidationError(
                "Disposable email addresses are not allowed."
            )
        return value

    def validate_message(self, value):
        """
        Validate the 'message' field.
        - Ensure the message is at least 10 characters long.
        - Sanitize input for safety.
        """
        if len(value) < 10:
            raise serializers.ValidationError(
                "Message must be at least 10 characters long."
            )

        sanitized = sanitize_input(value)

        if sanitized != value:
            raise serializers.ValidationError("Message contains unsafe characters.")
        return sanitized
