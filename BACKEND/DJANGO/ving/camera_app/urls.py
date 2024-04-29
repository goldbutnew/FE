from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    # path('convert_to_hls/', views.convert_to_hls),
    path('upload_video/', views.upload_video),
    # path('get_ts_segment/<int:sequence>/', views.get_ts_segment),
     ]