# from django.shortcuts import render
# import subprocess
# from django.http import JsonResponse
# from . import docker_ffmpeg



# def main(request):
#     user_name = "qudtls"
#     return JsonResponse({"url" : docker_ffmpeg.convert_stream_to_hls(user_name)})



# # Create your views here.

from django.shortcuts import render
from django.http import JsonResponse
from . import docker_ffmpeg

def main(request):
    user_name = "qudtls"
    try:
        result = docker_ffmpeg.convert_stream_to_hls(user_name)
        return JsonResponse({"url": result, "status": "success"})
    except Exception as e:
        # Log the error here if necessary
        return JsonResponse({"error": str(e), "status": "failure"}, status=500)
