from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    path("", RedirectView.as_view(url="/admin/")),  # Redirect root URL to /api
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),  # Include API routes
    path("ckeditor5/", include("django_ckeditor_5.urls")),
]

# Serve media files only in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
