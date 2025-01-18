from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.test_view, name='test_view'),
    path('generate-summary/', views.generate_keywords_and_summary, name='generate_keywords_and_summary'),
]
