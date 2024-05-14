from django.http import JsonResponse

from django.shortcuts import render

# Create your views here.

# @api_view(['GET'])
def get_1mb(request):
    return JsonResponse({ '1' : 1 })