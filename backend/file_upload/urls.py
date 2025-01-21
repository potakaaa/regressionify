from django.urls import path
from .views import FileUploadView, SelectSheet
urlpatterns = [
  path('upload/', FileUploadView.as_view()),
  path('select_sheet/', SelectSheet.as_view())
]