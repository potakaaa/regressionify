from django.db import models

# Create your models here.
class Files(models.Model):
    file = models.FileField(upload_to='uploads/')
    expiry_date = models.DateTimeField( )

    def __str__(self):
        return f"File: {self.file.name}"