from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('get_1mb/', views.get_1mb)
]