# import subprocess

# def convert_stream_to_hls(user_id):
#     container_names = [
#         "ffmpeg_720p",
#         "ffmpeg_360p",
#         "ffmpeg_480p"
#     ]
    
#     output_paths = [
#         f"/files/{user_id}_720p.m3u8",
#         f"/files/{user_id}_360p.m3u8",
#         f"/files/{user_id}_480p.m3u8",
#     ]

#     qualities = [
#         {'resolution': '1280x720', 'bitrate': '2500k', 'port': '1935'},
#         {'resolution': '640x360', 'bitrate': '800k', 'port': '1936'},
#         {'resolution': '854x480', 'bitrate': '1200k', 'port': '1937'},
#     ]


#     rtmp_urls = [
#         f"rtmp://0.0.0.0:1935/live/{user_id}_720p",
#         f"rtmp://0.0.0.0:1935/live/{user_id}_360p",
#         f"rtmp://0.0.0.0:1935/live/{user_id}_480p"
#     ]
#     # rtmp_urls = [
#     #     f"rtmp://0.0.0.0:{qualities[0]['port']}/live/{user_id}_720p",
#     #     f"rtmp://0.0.0.0:{qualities[1]['port']}/live/{user_id}_360p",
#     #     f"rtmp://0.0.0.0:{qualities[2]['port']}/live/{user_id}_480p"
#     # ]

#     processes = []

#     for container_name, output_path, quality, rtmp_url in zip(container_names, output_paths, qualities, rtmp_urls):
#         print(rtmp_url, 333333333333333333333)
#         command = [
#             'docker', 'exec', container_name, 'ffmpeg',
#             '-listen', '1',
#             '-i', rtmp_url,
#             '-c:v', 'libx264',
#             '-preset', 'fast',
#             '-tune', 'zerolatency',
#             '-c:a', 'aac',
#             '-b:a', '128k',
#             '-vf', f'scale={quality["resolution"]}',
#             '-b:v', quality['bitrate'],
#             '-f', 'hls',
#             '-hls_time', '1',
#             '-hls_list_size', '10',
#             output_path
#         ]
#         process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
#         processes.append(process)

#     for process in processes:
#         stdout, stderr = process.communicate()
#         print(f"STDOUT: {stdout.decode()}")
#         print(f"STDERR: {stderr.decode()}")
#         if process.returncode == 0:
#             print("Stream conversion successful")
#         else:
#             print("Error in stream conversion")

import subprocess
from multiprocessing import Process

def convert_stream_to_hls(user_id):
    container_name = "ffmpeg"
    
    output_paths = [
        f"/files/{user_id}_480p.m3u8",
        f"/files/{user_id}_720p.m3u8",
        f"/files/{user_id}_360p.m3u8",
    ]

    qualities = [
        {'resolution': '854x480', 'bitrate': '1200k', 'port': '1938'},
        {'resolution': '1280x720', 'bitrate': '2500k', 'port': '1936'},
        {'resolution': '640x360', 'bitrate': '800k', 'port': '1937'},
    ]

    # rtmp_urls = [
    #     f"rtmp://0.0.0.0:1935/live/{user_id}_720p",
    #     f"rtmp://0.0.0.0:1935/live/{user_id}_360p",
    #     f"rtmp://0.0.0.0:1935/live/{user_id}_480p"
    # ]
    rtmp_urls = [
        f"rtmp://0.0.0.0:1935/live/{user_id}_480p",
        f"rtmp://0.0.0.0:1936/live/{user_id}_720p",
        f"rtmp://0.0.0.0:1937/live/{user_id}_360p",
    ]

    processes = []

    for output_path, quality, rtmp_url in zip(output_paths, qualities, rtmp_urls):
        command = [
            'docker', 'exec', container_name, 'ffmpeg',
            '-listen', '1',
            '-i', rtmp_url,
            '-c:v', 'libx264',
            '-preset', 'fast',
            '-tune', 'zerolatency',
            '-c:a', 'aac',
            '-b:a', '128k',
            '-vf', f'scale={quality["resolution"]}',
            '-b:v', quality['bitrate'],
            '-f', 'hls',
            '-hls_time', '1',
            '-hls_list_size', '10',
            output_path
        ]
        process = Process(target=subprocess.run, args=(command,))
        process.start()
        print(1111111111)
        processes.append(process)

    for process in processes:
        process.join()

    print("All processes completed.")



# import subprocess

# def convert_stream_to_hls(user_id):
#     container_name = "ffmpeg"
    
#     output_paths = [
#         f"/files/{user_id}_720p.m3u8",
#         f"/files/{user_id}_360p.m3u8",
#         f"/files/{user_id}_480p.m3u8",
#     ]

#     qualities = [
#     {'resolution': '1280x720', 'bitrate': '2500k', 'port': '1936'},
#     {'resolution': '640x360', 'bitrate': '800k', 'port': '1937'},
#     {'resolution': '854x480', 'bitrate': '1200k', 'port': '1938'},
#         # {'resolution': '1280x720', 'bitrate': '2500k'},
#         # {'resolution': '640x360', 'bitrate': '800k'},
#         # {'resolution': '854x480', 'bitrate': '1200k'},
#     ]

#     rtmp_urls = [
#         f"rtmp://0.0.0.0:1936/live/{user_id}_720p",
#         f"rtmp://0.0.0.0:1937/live/{user_id}_360p",
#         f"rtmp://0.0.0.0:1938/live/{user_id}_480p"
#     ]
#     # rtmp_urls = [
#     #     f"rtmp://0.0.0.0:{qualities[0]['port']}/live/{user_id}_720p",
#     #     f"rtmp://0.0.0.0:{qualities[1]['port']}/live/{user_id}_360p",
#     #     f"rtmp://0.0.0.0:{qualities[2]['port']}/live/{user_id}_480p"
#     # ]


#     processes = []

#     for output_path, quality, rtmp_url in zip(output_paths, qualities, rtmp_urls):
#         command = [
#             'docker', 'exec', container_name, 'ffmpeg',
#             '-listen', '1',
#             '-i', rtmp_url,  # Listening flag removed if not needed
#             '-c:v', 'libx264',
#             '-preset', 'fast',
#             '-tune', 'zerolatency',
#             '-c:a', 'aac',
#             '-b:a', '128k',
#             '-vf', f'scale={quality["resolution"]}',
#             '-b:v', quality['bitrate'],
#             '-f', 'hls',
#             '-hls_time', '1',
#             '-hls_list_size', '10',
#             output_path
#         ]
#         process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
#         print(11111111111)
#         processes.append(process)
#     print(33333)
#     for process in processes:
#         stdout, stderr = process.communicate()
#         print(f"STDOUT: {stdout.decode()}")
#         print(f"STDERR: {stderr.decode()}")
#         if process.returncode == 0:
#             print("Stream conversion successful")
#         else:
#             print("Error in stream conversion")


# import subprocess
# import time
# from django.http import JsonResponse

# def convert_stream_to_hls(user_id):

#     container_name = "ffmpeg"
#     output_paths = [
#         f"/files/{user_id}_720p.m3u8",
#         f"/files/{user_id}_360p.m3u8",
#         f"/files/{user_id}_480p.m3u8",
#     ]
#     qualities = [
#         {'resolution': '1280x720', 'bitrate': '2500k'},
#         {'resolution': '854x480', 'bitrate': '1200k'},
#         {'resolution': '640x360', 'bitrate': '800k'},
#     ]
#     rtmp_urls = [
#         f'rtmp://0.0.0.0:1935/live/{user_id}_720p',
#         f'rtmp://0.0.0.0:1935/live/{user_id}_480p',
#         f'rtmp://0.0.0.0:1935/live/{user_id}_360p',
#     ]

#     processes = []
#     print(11111111111111)
#     # 기존에 사용 중인 포트에 대한 프로세스를 종료합니다.
    
#     print(22222222222222)
#     # 모든 프로세스가 완료될 때까지 기다립니다.
#     # time.sleep(5)  # 임의로 5초 대기
#     for output_path, quality, rtmp_url in zip(output_paths, qualities, rtmp_urls):
#         print(output_path, quality, rtmp_url)
#         command = [
#             'docker', 'exec', container_name, 'ffmpeg',
#             '-listen', '1',
#             '-i', rtmp_url,
#             '-c:v', 'libx264',
#             '-preset', 'fast',
#             '-tune', 'zerolatency',
#             '-c:a', 'aac',
#             '-b:a', '128k',
#             '-vf', f'scale={quality["resolution"]}',
#             '-b:v', quality['bitrate'],
#             '-f', 'hls',
#             '-hls_time', '4',
#             '-hls_list_size', '10',
#             output_path
#         ]
#         print(333333333)
#         process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
#         print(55555555)
#         subprocess.run(['lsof', '-ti', ':1935', '-sTCP:LISTEN', '-P'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
#         print(444444444)
#         processes.append(process)

#     return JsonResponse({"status": "started", "user_id": user_id})

# import subprocess
# from django.http import JsonResponse

# def start_hls_streaming(user_id, quality, rtmp_url, hls_port):
#     container_name = "ffmpeg"
#     output_path = f'/path/to/output/{user_id}_{quality}.m3u8'
    
#     # ffmpeg 명령어 구성
#     command = [
#         'docker', 'exec', container_name, 'ffmpeg',
#         '-listen', '1',
#         '-i', rtmp_url,
#         '-c:v', 'libx264',
#         '-preset', 'fast',
#         '-tune', 'zerolatency',
#         '-c:a', 'aac',
#         '-b:a', '128k',
#         '-vf', f'scale={quality}',
#         '-b:v', quality,
#         '-f', 'hls',
#         '-hls_time', '4',
#         '-hls_list_size', '10',
#         output_path
#     ]
    
#     # ffmpeg 명령어 실행
#     subprocess.Popen(command)

# def convert_stream_to_hls(user_id):
#     rtmp_urls = [
#         f'rtmp://0.0.0.0:1935/live/{user_id}_720p',
#         f'rtmp://0.0.0.0:1935/live/{user_id}_480p',
#         f'rtmp://0.0.0.0:1935/live/{user_id}_360p',
#     ]
#     hls_ports = [1936, 1937, 1938]
#     qualities = ['1280x720', '854x480', '640x360']
    
#     for rtmp_url, hls_port, quality in zip(rtmp_urls, hls_ports, qualities):
#         start_hls_streaming(user_id, quality, rtmp_url, hls_port)
    
#     return JsonResponse({"status": "started", "user_id": user_id})
