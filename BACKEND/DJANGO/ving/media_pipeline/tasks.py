from celery import shared_task
import subprocess
from django.http import HttpResponse
import os
import boto3
from botocore.exceptions import NoCredentialsError
from django.conf import settings

from celery import shared_task
import subprocess
import os
import boto3
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from django.conf import settings

class S3Uploader(FileSystemEventHandler):
    def __init__(self, bucket_name,s3_address):
        print('init')
        self.s3 = boto3.client(
            's3',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        )
        self.bucket_name = bucket_name
        self.s3_address = s3_address
    def on_modified(self, event):
        print('onmodified')
        # 파일이 수정되었을 때만 업로드
        if not event.is_directory and event.event_type == 'modified':
            self.upload_file(event.src_path)

    def upload_file(self, file_path):
        print('upload_file11111111')
        file_name = os.path.basename(file_path)
        if file_name.endswith('.tmp'):
            print(f"Skipping upload of temporary file: {file_name}")
            return
        print(f"Uploading {file_name} to S3...")
        print(self.s3_address)
        self.s3.upload_file(file_path, self.bucket_name, f'{self.s3_address}{file_name}')
        # self.s3.upload_file(file_path, self.bucket_name, file_name)

                # s3.put_object(Bucket='vingving', Key='720p/')
        # local_folder = "media/720"

        # # 로컬 폴더 내의 모든 파일을 찾아서 S3에 업로드
        # for root, dirs, files in os.walk(local_folder):
        #     for filename in files:
        #         local_path = os.path.join(root, filename)  # 로컬 파일 경로
        #         s3_path = os.path.join("720p", os.path.relpath(local_path, local_folder)).replace("\\", "/")
        #         s3.upload_file(local_path, "vingving", s3_path)  # S3에 파일 업로드
        print(f"Uploaded {file_name} to S3 successfully.")

@shared_task
def start_monitoring(directory_path, bucket_name,s3_address):
    print('start_monitoring222')
    event_handler = S3Uploader(bucket_name,s3_address)
    print('start_monitoring333')

    observer = Observer()
    print('start_monitoring444')

    observer.schedule(event_handler, directory_path, recursive=False)
    print('start_monitoring555')

    observer.start()
    try:
        # Run indefinitely
        while True:

            # print('true')
            observer.join(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

@shared_task
def convert_stream_to_hls(user_id, resolution, output_path, input_port):
    output_dir = f"media/{user_id}_{resolution}"  # 로컬에 저장될 디렉토리
    os.makedirs(output_dir, exist_ok=True)

    s3 = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            # region_name="ap-northeast-2",
        )
    s3.put_object(Bucket='vingving', Key=f'{user_id}_{resolution}/')
    s3_address = f'{user_id}_{resolution}/'
    if input_port == '1935':
        container_name = "ffmpeg"
    else :
        container_name = "ffmpeg_360p"
    quality = {
        '144p': {'resolution': '256x144', 'bitrate': '95k'},
        '240p': {'resolution': '426x240', 'bitrate': '150k'},
        '360p': {'resolution': '640x360', 'bitrate': '276k'},
        '480p': {'resolution': '854x480', 'bitrate': '750k'},
        '720p': {'resolution': '1280x720', 'bitrate': '2048k'}
    }

    # 입력 URL은 항상 1935번 포트로 설정
    
    rtmp_url = f"rtmp://0.0.0.0:{input_port}/live/{user_id}_{resolution}"
    
    # 출력 포트와 해상도에 따른 출력 파일 경로 설정
    # output_file = f"/media/{user_id}_{resolution}.m3u8"
    # output_file = f"{output_dir}/{user_id}_{resolution}.m3u8"
    output_file = f"/files/{user_id}_{resolution}/{user_id}_{resolution}.m3u8"
    print(output_file,222222222222222222222222222)
    print(input_port,rtmp_url)
    if input_port == "1935":
        command = [
            'docker', 'exec', container_name, 'ffmpeg',
            '-listen', '1',
            '-i', rtmp_url,
            '-c:v', 'libx264',
            '-preset', 'fast',
            '-tune', 'zerolatency',
            '-c:a', 'aac',
            '-b:a', '128k',
            '-vf', f'scale={quality[resolution]["resolution"]}',
            '-b:v', quality[resolution]['bitrate'],
            '-f', 'hls',
            '-hls_time', '1',
            '-hls_list_size', '10',
            output_file  # 출력 포트를 설정하여 변환 결과를 저장
        ]
    
    elif input_port == "1936":
        print(11111)
        command = [
            'docker', 'exec', container_name, 'ffmpeg',
            '-listen', '1',
            '-i', rtmp_url,
            '-c:v', 'libx264',
            '-preset', 'fast',
            '-tune', 'zerolatency',
            '-c:a', 'aac',
            '-b:a', '128k',
            '-vf', f'scale={quality[resolution]["resolution"]}',
            '-b:v', quality[resolution]['bitrate'],
            '-f', 'hls',
            '-hls_time', '1',
            '-hls_list_size', '10',
            output_file  # 출력 포트를 설정하여 변환 결과를 저장
        ]
    subprocess.Popen(command)
    # output_file = 'media/qudtls_720p.m3u8'
    # upload_to_s3(output_file, "vingving", f"{user_id}_{resolution}.m3u8")
    print('start_monitoring')
    start_monitoring(output_dir, "vingving",s3_address)


# def upload_to_s3(local_file, bucket, s3_file):
#     try:
#         s3 = boto3.client(
#             "s3",
#             aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
#             aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
#         )
#         print(local_file)
#         print(bucket)
#         print(s3_file)
#         local_file = local_file.replace('/files','media')
#         print(local_file)
#         print(3333333333333)
#         s3_folder_name = s3_file.replace('.m3u8','')
#         s3.put_object(Bucket='vingving', Key=f'{s3_folder_name}/')
#         local_folder = f"media/{s3_folder_name}"

#         # # 로컬 폴더 내의 모든 파일을 찾아서 S3에 업로드
#         for root, dirs, files in os.walk(local_folder):
#             for filename in files:
#                 local_path = os.path.join(root, filename)  # 로컬 파일 경로
#                 s3_path = os.path.join(s3_folder_name, os.path.relpath(local_path, local_folder)).replace("\\", "/")
#                 s3.upload_file(local_path, "vingving", s3_path)  # S3에 파일 업로드

#         # with open(local_file, 'rb') as f:
#         #     # S3로 파일 업로드
#         #     s3.upload_fileobj(f, bucket, s3_file)
#         # s3.upload_file(local_file, bucket, s3_file)
#         print("File uploaded successfully!")
#     except FileNotFoundError:
#         print("The file was not found")
#     except NoCredentialsError:
#         print("Credentials not available")



# from celery import shared_task
# import subprocess
# import os
# import time
# import boto3
# from botocore.exceptions import NoCredentialsError
# from django.conf import settings

# @shared_task
# def upload_to_s3(directory_path, bucket_name):
#     """Upload all files from a directory to an S3 bucket."""
#     s3 = boto3.client(
#         "s3",
#         aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
#         aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
#     )
#     try:
#         for filename in os.listdir(directory_path):
#             local_file_path = os.path.join(directory_path, filename)
#             s3_file_path = os.path.join(directory_path, filename)  # or customize path
#             s3.upload_file(local_file_path, bucket_name, s3_file_path)
#             print(f"Uploaded {filename} to S3 at {s3_file_path}")
#     except FileNotFoundError:
#         print("File not found")
#     except NoCredentialsError:
#         print("Credentials not available")
#     except Exception as e:
#         print(f"An error occurred: {e}")

# @shared_task
# def monitor_and_upload_files(directory_path, bucket_name, interval=10):
#     """Monitors a directory and uploads new files to S3 every few seconds."""
#     while True:
#         upload_to_s3(directory_path, bucket_name)
#         time.sleep(interval)

# @shared_task
# def convert_stream_to_hls(user_id, resolution, output_path, input_port):
#     output_dir = os.path.join("media", f"{user_id}_{resolution}")
#     os.makedirs(output_dir, exist_ok=True)
#     rtmp_url = f"rtmp://0.0.0.0:{input_port}/live/{user_id}_{resolution}"
#     # output_file = os.path.join(output_dir, f"{user_id}_{resolution}.m3u8")
#     output_file = f"/files/{user_id}_{resolution}/{user_id}_{resolution}.m3u8"


#     container_name = "ffmpeg" if input_port == '1935' else "ffmpeg_360p"
#     quality = {
#         '144p': {'resolution': '256x144', 'bitrate': '95k'},
#         '240p': {'resolution': '426x240', 'bitrate': '150k'},
#         '360p': {'resolution': '640x360', 'bitrate': '276k'},
#         '480p': {'resolution': '854x480', 'bitrate': '750k'},
#         '720p': {'resolution': '1280x720', 'bitrate': '2048k'}
#     }

#     command = [
#         'docker', 'exec', container_name, 'ffmpeg',
#         '-listen', '1',
#         '-i', rtmp_url,
#         '-c:v', 'libx264',
#         '-preset', 'fast',
#         '-tune', 'zerolatency',
#         '-c:a', 'aac',
#         '-b:a', '128k',
#         '-vf', f'scale={quality[resolution]["resolution"]}',
#         '-b:v', quality[resolution]['bitrate'],
#         '-f', 'hls',
#         '-hls_time', '1',
#         '-hls_list_size', '10',
#         output_file
#     ]
#     subprocess.Popen(command)
#     print(1111111111111111111111111111111111111111111111111111)
#     monitor_and_upload_files.delay(output_dir, "vingving")

