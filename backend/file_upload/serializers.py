from rest_framework import serializers
from django.core.validators import FileExtensionValidator
class FileUploadSerializer(serializers.Serializer):
  file = serializers.FileField(
    validators=[FileExtensionValidator(allowed_extensions=['xls', 'xlsx'])]
  )