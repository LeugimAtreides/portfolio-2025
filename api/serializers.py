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

from django.conf import settings

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


def _file_url(request, file_field) -> str | None:
    """Browser-ready URL for ImageField/FileField (S3 absolute URL or local absolute)."""
    if not file_field or not getattr(file_field, "name", None):
        return None
    url = file_field.url
    if url.startswith(("http://", "https://")):
        return url
    if url.startswith("/") and settings.MEDIA_URL.startswith("http"):
        rel = url.lstrip("/")
        if rel.startswith("media/"):
            rel = rel[6:]
        return f"{settings.MEDIA_URL.rstrip('/')}/{rel}"
    if request is not None:
        return request.build_absolute_uri(url)
    return url


def _rewrite_blog_embedded_media(html: str) -> str:
    """Point CKEditor /media/ and dev URLs at production MEDIA_URL (S3) in HTML."""
    if not html or settings.DEBUG:
        return html
    base = settings.MEDIA_URL
    if not base.endswith("/"):
        base = f"{base}/"
    html = html.replace('src="/media/', f'src="{base}')
    html = html.replace("src='/media/", f"src='{base}")
    html = html.replace('href="/media/', f'href="{base}')
    html = html.replace("href='/media/", f"href='{base}")
    for host in (
        "http://127.0.0.1:8000/media/",
        "http://localhost:8000/media/",
    ):
        html = html.replace(f'src="{host}', f'src="{base}')
        html = html.replace(f"src='{host}", f"src='{base}")
        html = html.replace(f'href="{host}', f'href="{base}')
        html = html.replace(f"href='{host}", f"href='{base}")
    return html


class ProjectSerializer(serializers.ModelSerializer):
    """
    Serializer for the Project model.
    Converts Project instances to JSON and validates incoming data.
    """

    class Meta:
        model = Project
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["image"] = _file_url(self.context.get("request"), instance.image)
        return data


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

    def to_representation(self, instance):
        data = super().to_representation(instance)
        content = data.get("content")
        if isinstance(content, str):
            data["content"] = _rewrite_blog_embedded_media(content)
        return data


class BlogCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogComment
        fields = [
            "id",
            "name",
            "comment",
            "created_at",
        ]

    def validate_name(self, value):
        if len(value.split()) < 2:  # Check for at least two parts in the name
            raise serializers.ValidationError("Please provide your full name.")
        return value

    def validate_comment(self, value):
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
            raise serializers.ValidationError("Comment contains unsafe characters.")
        return sanitized


class AboutMeSerializer(serializers.ModelSerializer):
    """
    Serializer for AboutMe model.
    converts AboutMe instance to JSON and validates incoming data.
    """

    class Meta:
        model = AboutMe
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["image"] = _file_url(self.context.get("request"), instance.image)
        return data


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
