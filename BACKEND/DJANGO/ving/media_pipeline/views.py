from django.shortcuts import render
import subprocess
from django.http import JsonResponse
from . import docker_ffmpeg



def main(request):
    user_name = "qudtls"
    return JsonResponse({"url" : docker_ffmpeg.convert_stream_to_hls(user_name)})



# Create your views here.
