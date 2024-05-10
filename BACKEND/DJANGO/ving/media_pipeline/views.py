from django.shortcuts import render
import subprocess
from django.http import JsonResponse
from . import docker_ffmpeg
import boto3


from django.http import HttpResponse
from .tasks import convert_stream_to_hls
from botocore.exceptions import NoCredentialsError
from django.conf import settings
import os


# def main(request):
#     # user_name = "qudtls"
#     username = request.GET.get('username') 
#     return JsonResponse({"url" : docker_ffmpeg.convert_stream_to_hls(username)})



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


# from django.http import HttpResponse
# from .tasks import convert_stream_to_hls
# from botocore.exceptions import NoCredentialsError
# from django.conf import settings
# import os
def main(request):
#     # user_id = request.user.id  # 예시로 사용자 ID를 가져옴
#     # resolutions = ['360p', '720p']
#     # output = ['1936','1935']
    
    print(1)
    # user_name = ["cjswo","qudtls"]
    user_name = 'qudtls'
    print(user_name,3111111111)
    # for i in range(len(resolutions)):
    output_path = f"/files/{user_name}_{'480p'}.m3u8"
    # output_path = f"/files/{user_name}_{resolutions[i]}.m3u8"
        # convert_stream_to_hls(user_name[i], resolutions[i], output_path,output[i])
    convert_stream_to_hls(user_name, '480p', output_path,'1935')
    # for resolution in resolutions:
    #     output_path = f"/files/{user_name}_{resolution}.m3u8"
    #     convert_stream_to_hls(user_name, resolution, output_path)
    return HttpResponse("Tasks have been sent to Celery for processing.")


# def upload_to_s3(local_file, bucket, s3_file):
#     print('upload_to_s3')
#     s3 = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID, aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
#     # s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY, region_name=AWS_REGION)
  
#     try:
#         print('try')
#         local_file = "/media/qudtls_720p.m3u8"
#         s3.upload_file(local_file, bucket, s3_file)
#         print("Upload Successful")
#         return True
#     except FileNotFoundError:
#         print("The file was not found")
#         return False
#     except NoCredentialsError:
#         print("Credentials not available")
#         return False
# output_file = "/files/qudtls_720.m3u8"
# s3_file_name = "qudtls_720.m3u8"
# # Call the upload_to_s3 function after the HLS file is generated
# upload_to_s3(output_file, 'vingving', s3_file_name)

def s3_connection():
    try:
        # S3 클라이언트 생성
        s3 = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            # region_name="ap-northeast-2",
        )
        # s3 = boto3.client(
        #     service_name="s3",
        #     region_name="ap-northeast-2",
        #     aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        #     aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        # )
        # 파일 업로드 시도
        print('temp')
        # s3.put_object(Bucket='vingving', Key='720p/')
        # local_folder = "media/720"
        print(os.getcwd())
        local_folder = "C:/Users/SSAFY/Downloads/GOODCODE/S10P31A203/BACKEND/STATIC/"
        words = ["audio", "video/720", "video/1080"]
        # # 로컬 폴더 내의 모든 파일을 찾아서 S3에 업로드
        # for root, dirs, files in os.walk(local_folder):
        #     for filename in files:
        #         local_path = os.path.join(root, filename)  # 로컬 파일 경로
        #         s3_path = os.path.join("720p", os.path.relpath(local_path, local_folder)).replace("\\", "/")
        #         print(s3_path)
                # s3.upload_file(local_path, "vingving", s3_path)  # S3에 파일 업로드
        # s3.put_object(Bucket='vingving', Key='1080p/')
        # local_folder = "media/1080"

        # # 로컬 폴더 내의 모든 파일을 찾아서 S3에 업로드
        # for root, dirs, files in os.walk(local_folder):
        #     for filename in files:
        #         local_path = os.path.join(root, filename)  # 로컬 파일 경로
        #         s3_path = os.path.join("1080p", os.path.relpath(local_path, local_folder)).replace("\\", "/")
        #         s3.upload_file(local_path, "vingving", s3_path)  # S3에 파일 업로드
        # s3.upload_file('media/qudtls_480p.m3u8', "vingving", "qudtls_480p.m3u8")
        # s3.upload_file('media/qudtls_480p0.ts', "vingving", "qudtls_480p0.ts")
        # s3.upload_file('media/qudtls_480p1.ts', "vingving", "qudtls_480p1.ts")
        # s3.upload_file('media/qudtls_480p2.ts', "vingving", "qudtls_480p2.ts")
        # s3.upload_file('media/qudtls_480p3.ts', "vingving", "qudtls_480p3.ts")
        # s3.upload_file('media/qudtls_480p4.ts', "vingving", "qudtls_480p4.ts")
    
      
        print("File uploaded successfully!")
    except Exception as e:
        print("Failed to upload file:", e)
        return None
    else:
        print("S3 bucket connected!") 
        return s3

s3 = s3_connection()
# try:
#     s3.upload_file('media/qudtls_720p.m3u8',settings.AWS_REGION,"qudtls_720p.m3u8")
# except Exception as e:
#     print(e)



# if s3:
#             try:
#                 response = s3.list_buckets()
#                 print("Bucket list:", response['Buckets'])
#             except Exception as e:
#                 print("Failed to list buckets:", e)
