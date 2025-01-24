from django.utils import timezone
from backend.file_upload.models import Files 
import logging

logger = logging.getLogger(__name__)

def delete_expired_media():
    current_date = timezone.now()
    expired_media_files = Files.objects.filter(expiry_date__lt=current_date)

    for media_file in expired_media_files:
        logger.info(f"Deleting expired media file: {media_file.file.name}")

        media_file.file.delete(save=False)  

        media_file.delete()

    return f"{expired_media_files.count()} expired media files have been deleted."
