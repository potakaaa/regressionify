from django.db import models

# Create your models here.
class File(models.Model):
    file = models.FileField(upload_to='uploads/')
    expiry_date = models.DateTimeField( )

    def __str__(self):
        return f"File: {self.file.name}"