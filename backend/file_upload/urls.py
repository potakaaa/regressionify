from django.urls import path
from .views import Test
urlpatterns = [
  path('upload/', Test.as_view())
]