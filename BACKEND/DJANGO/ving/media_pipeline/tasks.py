# tasks.py

# from celery import shared_task
# import subprocess

# @shared_task
# def convert_stream_to_hls(user_id, resolution, output_path):
#     container_name = "ffmpeg"
#     print(container_name,33333333333)
#     quality = {
#         '144p': {'resolution': '256x144', 'bitrate': '95k'},
#         '240p': {'resolution': '426x240', 'bitrate': '150k'},
#         '360p': {'resolution': '640x360', 'bitrate': '276k'},
#         '480p': {'resolution': '854x480', 'bitrate': '750k'},
#         '720p': {'resolution': '1280x720', 'bitrate': '2048k'}
#     }

#     rtmp_url = f"rtmp://0.0.0.0:1935/live/{user_id}_{resolution}"
    
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
#         output_path
#     ]
#     subprocess.Popen(command)


from celery import shared_task
import subprocess

@shared_task
def convert_stream_to_hls(user_id, resolution, output_path, input_port):
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
    output_file = f"/files/{user_id}_{resolution}.m3u8"
    # output_file = f"{output_path}_{resolution}.m3u8"

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
