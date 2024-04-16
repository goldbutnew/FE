from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    
    path('current_viewer_count/<int:room_id>', views.current_viewer_count),
    path('set_streaming_room_name/<int:room_id>/' , views.set_streaming_room_name),
    path('set_streaming_room_is_adult/<int:room_id>/' , views.set_streaming_room_is_adult),
]