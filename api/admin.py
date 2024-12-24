"""
Admin module for managing models in the Django admin interface.
This module registers the following models to the Django admin panel:
- Project
- Reference
- Subscriber
- Blog
- BlogComment

Additionally, this module customizes the Blog model admin interface to use CKEditor for rich text content editing.
"""

from django import forms
from django.contrib import admin
from django_ckeditor_5.fields import CKEditor5Widget

from .models import Project, Reference, Subscriber, Blog, BlogComment


class BlogAdminForm(forms.ModelForm):
    """
    Custom form for the Blog model, enabling CKEditor for the content field.
    """

    content = forms.CharField(widget=CKEditor5Widget())

    class Meta:
        model = Blog
        fields = "__all__"


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """
    Admin interface for the Project model.
    Displays title, creation date, and last updated date in the admin list view.
    Allows searching by project title.
    """

    list_display = ("title", "created_at", "updated_at")
    search_fields = ("title",)


@admin.register(Reference)
class ReferenceAdmin(admin.ModelAdmin):
    """
    Admin interface for the Reference model.
    Displays name, relationship, and creation date in the admin list view.
    Allows searching by name and relationship.
    """

    list_display = ("name", "relationship", "created_at")
    search_fields = ("name", "relationship")


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    """
    Admin interface for the Subscriber model.
    Displays email and subscription date in the admin list view.
    Allows searching by email.
    """

    list_display = ("email", "subscribed_at")
    search_fields = ("email",)


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    """
    Admin interface for the Blog model.
    Uses a custom form with CKEditor for editing the content field.
    Displays title, creation date, and last updated date in the admin list view.
    Allows searching by blog title.
    """

    form = BlogAdminForm
    list_display = ("title", "created_at", "updated_at")
    search_fields = ("title",)


@admin.register(BlogComment)
class BlogCommentAdmin(admin.ModelAdmin):
    """
    Admin interface for the BlogComment model.
    Displays the related blog, comment text, and creation date in the admin list view.
    Allows searching by blog title and comment content.
    """

    list_display = ("blog", "comment", "created_at")
    search_fields = ("blog__title", "comment")
