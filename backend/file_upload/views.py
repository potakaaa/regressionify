from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
from django.conf import settings
from .serializers import FileUploadSerializer
import pandas as pd
# Create your views here.\

class FileUploadView(APIView):
  def post(self, request, *args, **kwargs):
    serializer = FileUploadSerializer(data=request.data)

    if serializer.is_valid():
      uploaded_file = serializer.validated_data['file']
      
      file_path = default_storage.save(f"uploads/{uploaded_file.name}", uploaded_file)
      
      file_full_path = default_storage.path(file_path)
      
      
      try:
        pd.ExcelFile(file_full_path)
        sheetnames = pd.ExcelFile(file_full_path).sheet_names
      
      except Exception as e:
        return Response(
                    {"error": f"Could not process the file: {str(e)}"},
                    status=status.HTTP_400_BAD_REQUEST
                )
      
      return Response({
                        "file_full_path": file_full_path, #STORE THIS IN A REACT STATE
                        "sheetnames": sheetnames,
                      }, status=status.HTTP_201_CREATED) 
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  
class SelectSheet(APIView):
  def post(self, request, *args, **kwargs):
    # sheetname: taken from the dropdown
    # file_path: taken from the state
    
    try:
        
        
        sheetname = request.sheetname
        file_path = request.file_path
       
        
        df = pd.read_excel(file_path, sheet_name=sheetname, nrows=1)
        columns = df.columns.to_list()
        
    except Exception as e:
      return Response(
                    {"error": f"Could not process the file: {str(e)}"},
                    status=status.HTTP_400_BAD_REQUEST
                )
      
    return Response({
                        "columns": columns,
                      }, status=status.HTTP_201_CREATED)
    
    
class SelectColumns(APIView):
  def post(self, request, *args, **kwargs):
    #sheetname: taken from the dropdown
    #columns: taken from the checkboxes / dropdown
    #file_path: taken from the state
    
    try:
        
        sheetname = request.sheetname
        columns = request.columns
        file_path = request.file_path
        df = pd.read_excel(file_path, sheet_name=sheetname, usecols=columns)
        data = df.to_dict(orient='records')
        
      # REGRESSION SHIT CAN GO HERE
        
    except Exception as e:
      return Response(
                    {"error": f"Could not process the file: {str(e)}"},
                    status=status.HTTP_400_BAD_REQUEST
                )
      
    return Response({
                        "data": data,
                      }, status=status.HTTP_201_CREATED)
    

