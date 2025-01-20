from django.db import models

# Create your models here.
class UploadModel(models.Model):
    file = models.FileField(upload_to='uploads/')

    def __str__(self):
        return f"File: {self.file.name}"