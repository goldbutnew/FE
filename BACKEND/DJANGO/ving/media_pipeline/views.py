# from django.shortcuts import render
# import subprocess
# from django.http import JsonResponse
# from . import docker_ffmpeg



# def main(request):
#     user_name = "qudtls"
#     return JsonResponse({"url" : docker_ffmpeg.convert_stream_to_hls(user_name)})



# # Create your views here.

# from django.shortcuts import render
# from django.http import JsonResponse
# from . import docker_ffmpeg

# def main(request):
#     user_name = "qudtls"
#     try:
#         result = docker_ffmpeg.convert_stream_to_hls(user_name)
#         return JsonResponse({"url": result, "status": "success"})
#     except Exception as e:
#         # Log the error here if necessary
#         return JsonResponse({"error": str(e), "status": "failure"}, status=500)


from django.http import HttpResponse
from .tasks import convert_stream_to_hls

def main(request):
    # user_id = request.user.id  # 예시로 사용자 ID를 가져옴
    resolutions = ['360p', '720p']
    output = ['1936','1935']

    user_name = ["cjswo","qudtls"]
    print(user_name,3111111111)
    for i in range(len(resolutions)):
        output_path = f"/files/{user_name}_{resolutions[i]}.m3u8"
        convert_stream_to_hls(user_name[i], resolutions[i], output_path,output[i])
    # for resolution in resolutions:
    #     output_path = f"/files/{user_name}_{resolution}.m3u8"
    #     convert_stream_to_hls(user_name, resolution, output_path)
    return HttpResponse("Tasks have been sent to Celery for processing.")
