# scraper/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('api/analyze-ads/', views.analyze_ads, name='analyze_ads'),
    path('process_image_url/', views.process_image_url, name='process_image_url'),
    path('upload_image/', views.upload_image, name='upload_image'),
]
