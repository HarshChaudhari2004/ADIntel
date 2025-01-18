# scraper/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('process_image_url/', views.process_image_url, name='process_image_url'),
    path('upload_image/', views.upload_image, name='upload_image'),
]
