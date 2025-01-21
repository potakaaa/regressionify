from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
from django.conf import settings
from .serializers import FileUploadSerializer
import pandas as pd
# Create your views here.

class FileUploadView(APIView):
  def post(self, request, *args, **kwargs):
    serializer = FileUploadSerializer(data=request.data)

    if serializer.is_valid():
      uploaded_file = serializer.validated_data['file']
      sheetname = serializer.validated_data.get('sheetname') 
      
      
      file_path = default_storage.save(f"uploads/{uploaded_file.name}", uploaded_file)
      file_url = default_storage.url(file_path) 
      
      file_full_path = default_storage.path(file_path)
      
      
      try:
        excel_file = pd.ExcelFile(file_full_path)
        
        all_sheet_names = excel_file.sheet_names
        if not sheetname:
          sheetname = all_sheet_names[0]
       
        
        df = pd.read_excel(file_full_path, sheet_name=sheetname, nrows=1)
        columns = df.columns.to_list()
        
      except Exception as e:
        return Response(
                    {"error": f"Could not process the file: {str(e)}"},
                    status=status.HTTP_400_BAD_REQUEST
                )

      return Response({
                        "file_url": file_url,
                        "sheetname": sheetname,
                        "columns": columns,
                      }, status=status.HTTP_201_CREATED) 
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

