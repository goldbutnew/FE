from django.shortcuts import render
import subprocess
from django.http import JsonResponse
from . import docker_ffmpeg
import boto3
from celery import shared_task
from watchdog.events import FileSystemEventHandler, FileMovedEvent
from django.http import HttpResponse
from .tasks import convert_stream_to_hls
from botocore.exceptions import NoCredentialsError
from django.conf import settings
import os
from watchdog.observers import Observer
from pathlib import Path

# FFM_BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent.parent.parent.parent.parent.parent
# FFMPEG_ROOT = FFM_BASE_DIR

# # print(FFM_BASE_DIR)
# class S3Uploader(FileSystemEventHandler):
#     def __init__(self, bucket_name, s3_address):
#         self.s3 = boto3.client(
#             's3',
#             aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
#             aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
#         )
#         self.bucket_name = bucket_name
#         self.s3_address = s3_address

#     def on_modified(self, event):
#         if not event.is_directory:
#             self.handle_upload(event.src_path)

#     def on_created(self, event):
#         if not event.is_directory:
#             self.handle_upload(event.src_path)

#     def on_moved(self, event):
#         if isinstance(event, FileMovedEvent):
#             print(f"File moved from {event.src_path} to {event.dest_path}")
#             if event.dest_path.endswith('.m3u8'):
#                 self.handle_upload(event.dest_path)

#     def handle_upload(self, file_path):
#         file_name = os.path.basename(file_path)
#         if file_name.endswith('.tmp'):
#             print(f"Skipping temporary file: {file_name}")
#             return
#         s3_key = f'{self.s3_address}/{file_name}'
#         print(f"Uploading {file_name} to S3...")
#         # self.s3.upload_file(file_path, self.bucket_name, f'{self.s3_address}{file_name}')
#         self.s3.upload_file(file_path, self.bucket_name, s3_key)
#         print(f"Uploaded {file_name} to S3 successfully.")

# @shared_task
# def start_monitoring(directory_path, bucket_name,s3_address):
#     print('start_monitoring222')
#     event_handler = S3Uploader(bucket_name,s3_address)
#     print('start_monitoring333')

#     observer = Observer()
#     print('start_monitoring444')

#     observer.schedule(event_handler, directory_path, recursive=True)
#     print('start_monitoring555')

#     observer.start()
#     try:
#         # Run indefinitely
#         while True:

#             # print('true')
#             observer.join(1)
#     except KeyboardInterrupt:
#         observer.stop()
#     observer.join()

# start_monitoring(FFMPEG_ROOT/'files', 'vingving','files/')
FFM_BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent.parent.parent.parent.parent.parent
FFMPEG_ROOT = FFM_BASE_DIR
class S3Uploader(FileSystemEventHandler):
    def __init__(self, bucket_name, s3_address, base_dir):
        self.s3 = boto3.client(
            's3',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        )
        self.bucket_name = bucket_name
        self.s3_address = s3_address
        self.base_dir = base_dir

    def on_modified(self, event):
        if not event.is_directory:
            self.handle_upload(event.src_path)

    def on_created(self, event):
        if not event.is_directory:
            self.handle_upload(event.src_path)

    def on_moved(self, event):
        if isinstance(event, FileMovedEvent):
            print(f"File moved from {event.src_path} to {event.dest_path}")
            if event.dest_path.endswith('.m3u8'):
                self.handle_upload(event.dest_path)

    def handle_upload(self, file_path):
        file_name = os.path.basename(file_path)
        if file_name.endswith('.tmp'):
            print(f"Skipping temporary file: {file_name}")
            return
        relative_path = Path(file_path).relative_to(self.base_dir).as_posix()
        s3_key = f'{self.s3_address}/{relative_path}'
        print(f"Uploading {relative_path} to S3...")
        self.s3.upload_file(file_path, self.bucket_name, s3_key)
        print(f"Uploaded {file_name} to S3 successfully.")

@shared_task
def start_monitoring(directory_path, bucket_name, s3_address):
    base_dir = Path(directory_path)
    print('Starting monitoring')
    event_handler = S3Uploader(bucket_name, s3_address, base_dir)
    observer = Observer()
    observer.schedule(event_handler, directory_path, recursive=True)
    observer.start()
    try:
        while True:
            observer.join(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

# Start the monitoring
start_monitoring(FFMPEG_ROOT/'files', 'vingving', 'files/')
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
        # local_folder = "C:/Users/SSAFY/Downloads/GOODCODE/S10P31A203/BACKEND/STATIC/"
        # words = ["audio/256/", "audio/320/", "video/720/", "video/1080/", "master/"]
        # # # 로컬 폴더 내의 모든 파일을 찾아서 S3에 업로드\
        # for word in words:
        #     s3.put_object(Bucket='vingving', Key=word)

        #     for root, dirs, files in os.walk(local_folder + word):
        #         for filename in files:
        #             local_path = os.path.join(root, filename)  # 로컬 파일 경로
        #             s3_path = os.path.join("", os.path.relpath(local_path, local_folder)).replace("\\", "/")
        #             print(s3_path)
        #             s3.upload_file(local_path, "vingving", s3_path)  # S3에 파일 업로드
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
        s3.upload_file('media/1MB.txt', "vingving", "1MB.txt")
        s3.upload_file('media/10MB.txt', "vingving", "10MB.txt")
    
      
        print("File uploaded successfully!")
    except Exception as e:
        print("Failed to upload file:", e)
        return None
    else:
        print("S3 bucket connected!") 
        return s3

s3 = s3_connection()

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


