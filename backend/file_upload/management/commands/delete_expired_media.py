from django.core.management.base import BaseCommand
from file_upload.models import File
from django.utils import timezone
import logging

logger = logging.getLogger(__name__)

def delete_expired_media():
    current_date = timezone.now()
    expired_media_files = File.objects.filter(expiry_date__lt=current_date)

    for media_file in expired_media_files:
        logger.info(f"Deleting expired media file: {media_file.file.name}")

        media_file.file.delete(save=False)  

        media_file.delete()

    return f"{expired_media_files.count()} expired media files have been deleted."


# i will implement this as a cron job on deployment. Does not make sense to run this on development
# for test purposes, u may simply run "manage.py delete_expired_media" to see the output,
# it will delete all expired media files (older than an hour) from the database and the filesystem
class Command(BaseCommand):
    help = "Deletes expired media files"

    def handle(self, *args, **kwargs):
        result = delete_expired_media()
        self.stdout.write(result)
