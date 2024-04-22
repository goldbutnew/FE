from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('start_stream/', views.start_stream),
    path('end_stream/', views.end_stream),
]