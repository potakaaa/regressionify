from rest_framework import serializers
from django.utils.timezone import now, timedelta
from .models import Files

from django.core.validators import FileExtensionValidator
class FileUploadSerializer(serializers.ModelSerializer):
    file = serializers.FileField(
        validators=[FileExtensionValidator(allowed_extensions=['xls', 'xlsx'])]
    )

    class Meta:
        model = Files
        fields = ['file', 'expiry_date']
        read_only_fields = ['expiry_date']  

    def create(self, validated_data):
        validated_data['expiry_date'] = now() + timedelta(hours=1)
        return super().create(validated_data)

class SelectSheetSerializer(serializers.Serializer):
  sheetname = serializers.CharField()
  file_path = serializers.CharField()
  

class SelectColumnsSerializer(serializers.Serializer):
  independent_columns = serializers.ListField(child=serializers.CharField())
  dependent_column = serializers.CharField()
  sheetname = serializers.CharField()
  file_path = serializers.CharField()