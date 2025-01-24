from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
from .serializers import FileUploadSerializer, SelectSheetSerializer, SelectColumnsSerializer
import pandas as pd
from .models import Files
from .utils.regression import regression
# Create your views here.\

class FileUploadView(APIView):
  def post(self, request, *args, **kwargs):
    serializer = FileUploadSerializer(data=request.data)

    if serializer.is_valid():
      file_instance = serializer.save()
      '''uploaded_file = serializer.validated_data['file']
      
      file_path = default_storage.save(f"uploads/{uploaded_file.name}", uploaded_file)
      '''
      file_full_path = file_instance.file.path
      
      
      try:
        pd.ExcelFile(file_full_path)
        sheetnames = pd.ExcelFile(file_full_path).sheet_names
        

      
      except Exception as e:
        default_storage.delete(file_full_path)
        return Response(
                    {"error": f"Could not process the file: {str(e)}"},
                    status=status.HTTP_400_BAD_REQUEST
                )
      
      return Response({
                        "file_full_path": file_full_path, #STORE THIS IN A REACT STATE
                        "expiry_date": file_instance.expiry_date,
                        "sheetnames": sheetnames,
                      }, status=status.HTTP_201_CREATED) 
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  
class SelectSheet(APIView):
  def post(self, request, *args, **kwargs):
    # sheetname: taken from the dropdown, stored in react state
    # file_path: taken from the state
    serializer = SelectSheetSerializer(data=request.data)
    
    if serializer.is_valid():
      sheetname = serializer.validated_data['sheetname']
      file_path = serializer.validated_data['file_path']
    
      try:
          
        df = pd.read_excel(file_path, sheet_name=sheetname, nrows=1)
        columns = df.columns.to_list()
        
        return Response({
                          "columns": columns,
                        }, status=status.HTTP_201_CREATED)
          
      except Exception as e:
        return Response(
                      {"error": f"Could not process the file: {str(e)}"},
                      status=status.HTTP_400_BAD_REQUEST
                  )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
      
class SelectColumns(APIView):
  def post(self, request, *args, **kwargs):
    #sheetname: taken from the state after selecting the sheet
    #independent_columns: taken after selecting the columns
    #dependent_column: taken after selecting the column
    #file_path: taken from the state
    
    serializer = SelectColumnsSerializer(data=request.data)
    
    if serializer.is_valid():
      sheetname = serializer.validated_data['sheetname']
      dependent_column = serializer.validated_data['dependent_column']
      independent_columns = serializer.validated_data['independent_columns']
      file_path = serializer.validated_data['file_path']
      
      columns = independent_columns + [dependent_column]
    
      try:
          df = pd.read_excel(file_path, sheet_name=sheetname, usecols=columns)
          
          regression_summary = regression(df, dependent_column, independent_columns)
          
          return Response({
                          "regression_summary": regression_summary,
                        }, status=status.HTTP_201_CREATED)
        
          
      except Exception as e:
        return Response(
                      {"error": f"Could not process the file: {str(e)}"},
                      status=status.HTTP_400_BAD_REQUEST
                  )
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      
    
    

