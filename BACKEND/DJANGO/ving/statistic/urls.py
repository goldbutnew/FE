from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('play_count/', views.play_count),
    path('total_viewer/', views.total_viewer),
    path('test/', views.test),
]