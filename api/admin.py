from django import forms
from django.contrib import admin
from django_ckeditor_5.fields import CKEditor5Widget

from .models import (
    Project,
    Reference,
    Subscriber,
    Blog,
    BlogComment,
    AboutMe,
    ContactMe,
)


# Blog Admin Form with CKEditor
class BlogAdminForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditor5Widget())

    class Meta:
        model = Blog
        fields = "__all__"


# About Me Admin
@admin.register(AboutMe)
class AboutMeAdmin(admin.ModelAdmin):
    """
    Admin interface for the About Me model.
    Ensures only one entry exists and allows editing the title, content, and image.
    """

    def has_add_permission(self, request):
        """
        Restrict adding new entries if one already exists.
        """
        return not AboutMe.objects.exists()

    list_display = ("title", "updated_at")
    fields = ("title", "content", "image")
    search_fields = ("title",)


# Project Admin
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """
    Admin interface for the Project model.
    Displays title, creation date, and last updated date in the admin list view.
    Allows searching by project title.
    """

    list_display = ("title", "created_at", "updated_at", "url")
    search_fields = ("title",)
    fields = ("title", "image", "url", "description")


# Reference Admin
@admin.register(Reference)
class ReferenceAdmin(admin.ModelAdmin):
    """
    Admin interface for the Reference model.
    Displays name, relationship, and contact info in the admin list view.
    Allows searching by name and relationship.
    """

    list_display = ("name", "relationship", "contact_info", "created_at")
    search_fields = ("name", "relationship", "contact_info")
    fields = ("name", "job_title", "relationship", "contact_info")


# Subscriber Admin
@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "subscribed_at")
    search_fields = ("email",)


# Blog Admin
@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    form = BlogAdminForm
    list_display = ("title", "created_at", "updated_at")
    search_fields = ("title",)


# BlogComment Admin
@admin.register(BlogComment)
class BlogCommentAdmin(admin.ModelAdmin):
    list_display = ("blog", "comment", "created_at")
    search_fields = ("blog__title", "comment")


# Contact Me Admin
@admin.register(ContactMe)
class ContactMeAdmin(admin.ModelAdmin):
    """
    Admin interface for the ContactMe model.
    """

    list_display = ("name", "email", "created_at", "short_message")
    list_filter = ("created_at",)  # Filter contacts by submission date
    search_fields = (
        "name",
        "email",
        "message",
    )  # Allow searching by name, email, or message
    readonly_fields = (
        "name",
        "email",
        "message",
        "created_at",
    )  # Make fields read-only
    ordering = ("-created_at",)  # Show the latest contacts first

    def short_message(self, obj):
        """
        Display a truncated version of the message.
        """
        return obj.message[:50] + ("..." if len(obj.message) > 50 else "")

    short_message.short_description = "Message"
