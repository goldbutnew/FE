from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    
    path('current_top_viewers/', views.current_top_viewers),
    path('set_streaming_room_name/' , views.set_streaming_room_name),
    path('set_streaming_room_is_adult/' , views.set_streaming_room_is_adult),
    path('create_streaming_room/' , views.create_streaming_room),
    path('update_streaming_room_thumbnail/' , views.update_streaming_room_thumbnail),
    path('delete_streaming_room/' , views.delete_streaming_room),
    path('update_user_blocked_status/' , views.update_user_blocked_status),
    path('create_stream', views.create_streaming_room)
]