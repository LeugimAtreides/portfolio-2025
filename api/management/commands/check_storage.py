from django.core.files.storage import default_storage
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = (
        "Print the active default file storage backend (run on Render to verify S3 vs local)."
    )

    def handle(self, *args, **options):
        cls = default_storage.__class__
        self.stdout.write(f"{cls.__module__}.{cls.__name__}")
        bucket = getattr(default_storage, "bucket_name", None)
        if bucket:
            self.stdout.write(f"Bucket name: {bucket}")
