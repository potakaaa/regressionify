from rest_framework import serializers
from django.core.validators import FileExtensionValidator
class FileUploadSerializer(serializers.Serializer):
  file = serializers.FileField(
    validators=[FileExtensionValidator(allowed_extensions=['xls', 'xlsx'])]
  )

class SelectSheetSerializer(serializers.Serializer):
  sheetname = serializers.CharField()
  file_path = serializers.CharField()
  

class SelectColumnsSerializer(serializers.Serializer):
  independent_columns = serializers.ListField(child=serializers.CharField())
  dependent_column = serializers.CharField()
  sheetname = serializers.CharField()
  file_path = serializers.CharField()