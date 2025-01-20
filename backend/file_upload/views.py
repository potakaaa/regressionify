from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
from django.conf import settings
from .serializers import FileUploadSerializer
# Create your views here.

class FileUploadView(APIView):
  def post(self, request, *args, **kwargs):
    serializer = FileUploadSerializer(data=request.data)

    if serializer.is_valid():
      uploaded_file = serializer.validated_data['file']

      file_path = default_storage.save(f"uploads/{uploaded_file.name}", uploaded_file)
      file_url = default_storage.url(file_path)

      return Response({"file_url": file_url}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
