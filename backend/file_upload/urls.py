from django.urls import path
from .views import FileUploadView, SelectSheet, SelectColumns
urlpatterns = [
  path('upload/', FileUploadView.as_view()),
  path('select_sheet/', SelectSheet.as_view()),
  path('select_columns/', SelectColumns.as_view()),
]