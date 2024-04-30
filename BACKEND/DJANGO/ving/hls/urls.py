from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('stream_hls/<str:stream_id>/', views.stream_hls),
]