

# import subprocess
# from multiprocessing import Process

# def convert_stream_to_hls(user_id):
#     container_name = "ffmpeg"
    
#     output_paths = [
#         f"/files/{user_id}_480p.m3u8",
#         f"/files/{user_id}_720p.m3u8",
#         f"/files/{user_id}_360p.m3u8",
#     ]

#     qualities = [
#         {'resolution': '854x480', 'bitrate': '1200k', 'port': '1938'},
#         {'resolution': '1280x720', 'bitrate': '2500k', 'port': '1936'},
#         {'resolution': '640x360', 'bitrate': '800k', 'port': '1937'},
#     ]

#     # rtmp_urls = [
#     #     f"rtmp://0.0.0.0:1935/live/{user_id}_720p",
#     #     f"rtmp://0.0.0.0:1935/live/{user_id}_360p",
#     #     f"rtmp://0.0.0.0:1935/live/{user_id}_480p"
#     # ]
#     rtmp_urls = [
#         f"rtmp://0.0.0.0:1935/live/{user_id}_480p",
#         f"rtmp://0.0.0.0:1935/live/{user_id}_720p",
#         f"rtmp://0.0.0.0:1935/live/{user_id}_360p",
#     ]

#     processes = []

#     for output_path, quality, rtmp_url in zip(output_paths, qualities, rtmp_urls):
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
#         process = Process(target=subprocess.run, args=(command,))
#         process.start()
#         print(1111111111)
#         processes.append(process)

#     for process in processes:
#         process.join()

#     print("All processes completed.")



import subprocess

def convert_stream_to_hls(user_id):
    container_name = "ffmpeg"
    
    output_path_1080 = f"/files/1080/{user_id}.m3u8"
    output_path_720 = f"/files/720/{user_id}.m3u8"
    output_path_480 = f"/files/480/{user_id}.m3u8"
    output_path = f"/files/{user_id}.m3u8"
    OUTPUT_PATH = "/files"

    # Docker 내에서 실행할 ffmpeg 명령 구성
    # command = [
    #     'docker', 'exec', container_name, 'ffmpeg',
    #     '-listen', '1',
    #     '-i', rtmp_url,
    #     '-c:v', 'libx264',
    #     '-preset', 'fast',
    #     '-tune', 'zerolatency',
    #     '-c:a', 'aac',
    #     '-b:a', '128k',
    #     '-f', 'hls',
    #     '-hls_time', '10',
    #     '-hls_list_size', '10',
    #     '-hls_wrap', '10',
    #     output_path
    # ]

    # command = [
    #     'docker', 'exec', container_name, 'ffmpeg',
    #     '-listen', '1',
    #     '-i', rtmp_url,
    #     '-c:v', 'libx264',
    #     '-preset', 'fast',
    #     '-tune', 'zerolatency',
    #     '-c:a', 'aac',
    #     '-b:a', '128k',
    #     '-f', 'hls',
    #     '-hls_time', '10',
    #     '-hls_list_size', '10',
    #     '-hls_wrap', '10',
    #     output_path_1080
    # ]

    command = [
        'docker', 'exec', container_name, 'ffmpeg',
        '-listen', '1',
        '-i', rtmp_url,
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-tune', 'zerolatency',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-f', 'hls',
        '-hls_time', '1',
        '-hls_list_size', '10',
        output_path
    ]
        
    command = [
        'docker', 'exec', container_name, 'ffmpeg',
        '-listen', '1',
        '-i', rtmp_url,
        '-g', '30',
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-tune', 'zerolatency',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-f', 'hls',
        '-hls_time', '1',
        '-hls_list_size', '10',
        output_path
    ]

    # command = [
    #     'docker', 'exec', container_name, 'ffmpeg',
    #     '-listen', '1',
    #     '-i', rtmp_url,
    #     '-map', '0:v', '-map', '0:v', '-map', '0:v',  # 비디오 스트림 매핑
    #     '-map', '0:a', '-map', '0:a', '-map', '0:a',  # 오디오 스트림 매핑
    #     '-b:v:0', '5000k', '-maxrate:v:0', '5000k', '-bufsize:v:0', '10000k', '-s:v:0', '1920x1080', '-crf:v:0', '15', '-an',
    #     '-b:v:1', '2500k', '-maxrate:v:1', '2500k', '-bufsize:v:1', '5000k', '-s:v:1', '1280x720', '-crf:v:1', '22', '-an',
    #     '-b:v:2', '1000k', '-maxrate:v:2', '1000k', '-bufsize:v:2', '2000k', '-s:v:2', '854x480', '-crf:v:2', '28', '-an',
    #     '-b:a:0', '320k',
    #     '-b:a:1', '256k',
    #     '-b:a:2', '128k',
    #     '-var_stream_map', '''"v:0,name:v1080 v:1,name:v720 v:2,name:v480 a:0,name:a320 a:1,name:a256 a:2,name:a128"''',
    #     '-master_pl_name', 'master.m3u8',
    #     '-g', '30',
    #     '-preset', 'fast',
    #     '-tune', 'zerolatency',
    #     '-hls_segment_filename', f'{OUTPUT_PATH}/%v/output_%03d.ts',
    #     '-f', 'hls', f"{OUTPUT_PATH}/%v/playlist.m3u8",
    #     '-hls_time', '1',
    #     '-hls_list_size', '10'
    # ]

    OUTPUT_PATH = f'files/%v/{user_id}.m3u8'
    OUTPUT_HLS = f'files/%v/{user_id}_%03d.ts'
    command = [
        'docker', 'exec', container_name, 'ffmpeg',
        '-y',
        '-listen', '1',
        '-i', rtmp_url,
        '-map', '0:v',
        # '-map', '0:v', 
        # '-map', '0:v',
        '-c:v:0', 'libx264', '-c:a:0', 'aac',  '-b:v:0',  '5000k', '-maxrate:v:0', '5000k', '-bufsize:v:0', '10000k', '-s:v:0', '1920x1080', '-crf:v:0', '15', '-b:a:0', '128k',
        # '-b:v:1', '2500k', '-maxrate:v:1', '2500k', '-bufsize:v:1', '5000k', '-s:v:1', '1280x720', '-crf:v:1', '22', '-b:a:1', '96k',
        # '-b:v:2', '1000k', '-maxrate:v:2', '1000k', '-bufsize:v:2', '2000k', '-s:v:2', '854x480', '-crf:v:2', '28', '-b:a:2', '64k',
        '-var_stream_map', "v:0,name:1080",
        
        # '-var_stream_map', '''"v:0,name:1080 v:1,name:720 v:2,name:480"''',
        '-master_pl_name', 'master.m3u8',
        '-hls_time', '10',
        '-hls_list_size', '10',
        '-hls_segment_filename',  OUTPUT_HLS,
        '-f', 'hls', OUTPUT_PATH
    ]



    command = [
        'docker', 'exec', container_name, 'ffmpeg',
        '-listen', '1',  # 서버 모드 활성화, 외부 연결 수신
        '-i', rtmp_url,  # RTMP URL로부터 입력 수신
        '-map', '0:v:0',  # 첫 번째 비디오 스트림 선택
        '-map', '0:a:0',  # 첫 번째 오디오 스트림 선택
        '-g', '30',  # 그룹 오브 픽쳐 (GOP) 크기 설정
        '-c:v', 'libx264',  # 비디오 코덱 설정
        '-preset', 'fast',  # 인코딩 프리셋
        '-tune', 'zerolatency',  # 튜닝 옵션, 지연 최소화
        '-c:a', 'aac',  # 오디오 코덱 설정
        '-b:a', '128k',  # 오디오 비트레이트
        '-f', 'hls',  # 출력 포맷을 HLS로 설정
        '-hls_time', '1',  # 각 HLS 세그먼트의 길이 설정
        '-hls_list_size', '10',  # 재생 목록에 유지할 최대 세그먼트 수
        output_path  # 출력 경로
    ]

    command = [
        'docker', 'exec', container_name, 'ffmpeg',
        '-listen', '1',
        '-i', rtmp_url,
        '-map', '0:v:0',  # 첫 번째 비디오 스트림 매핑
        '-map', '0:a:0',  # 첫 번째 오디오 스트림 매핑
        '-c:v', 'libx264', '-b:v', '5000k', '-maxrate', '5000k', '-bufsize', '10000k', '-s', '1920x1080', '-g', '30', '-crf', '20',
        '-c:a', 'aac', '-b:a', '192k',
        '-var_stream_map', 'v:0,name:video a:0,name:audio',  # 비디오 및 오디오 스트림 이름 지정
        '-f', 'hls',
        '-hls_time', '4',
        '-hls_list_size', '0',
        '-hls_segment_filename', f'{output_path}/%v/output_%03d.ts',  # 세그먼트 파일 경로
        f'{output_path}/%v/playlist.m3u8'  # 재생 목록 파일 경로
    ]

    command = [
        'docker', 'exec', container_name, 'ffmpeg',
        '-listen', '1',
        '-i', rtmp_url,
        '-map', '0:v:0',  # 첫 번째 비디오 스트림 매핑
        '-map', '0:a:0',  # 첫 번째 오디오 스트림 매핑
        '-c:v', 'libx264', '-b:v', '5000k', '-maxrate', '5000k', '-bufsize', '10000k', '-s', '1920x1080', '-g', '30', '-crf', '20',
        '-c:a', 'aac', '-b:a', '192k',
        '-var_stream_map', 'v:0,name:video a:0,name:audio',  # 비디오 및 오디오 스트림 이름 지정
        '-f', 'hls',
        '-hls_time', '4',
        '-hls_list_size', '0',
        '-hls_segment_filename', f'{output_path}/%v/output_%03d.ts',  # 세그먼트 파일 경로
        f'{output_path}/%v/playlist.m3u8'  # 재생 목록 파일 경로
    ]

    OUTPUT_PATH = f'files/%v/{user_id}.m3u8'
    OUTPUT_HLS = f'files/%v/{user_id}_%03d.ts'
    command = [
        'docker', 'exec', container_name, 'ffmpeg',
        '-y',
        '-listen', '1',
        '-i', rtmp_url,
        '-map', '0:v:0', '-map', '0:v:0',
        '-c:v:0', 'libx264',  '-b:v:0',  '5000k', '-maxrate:v:0', '5000k', '-bufsize:v:0', '10000k', '-s:v:0', '1920x1080', '-g', '30', '-crf:v:0', '15',
        '-c:v:1', 'libx264',  '-b:v:1',  '2500k', '-maxrate:v:1', '2500k', '-bufsize:v:1', '5000k', '-s:v:1', '1280x720', '-g', '30', '-crf:v:1', '22',
        '-var_stream_map', 'v:0,name:1080 v:1,name:720',
        # '-master_pl_name', 'master.m3u8',
        '-hls_time', '3',
        '-hls_list_size', '10',
        '-hls_segment_filename', OUTPUT_HLS,
        '-f', 'hls', OUTPUT_PATH
    ]


    # subprocess를 사용하여 비동기로 ffmpeg 명령 실행
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    # process = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    # 로그 출력 (예시로 stderr만 출력)
    stdout, stderr = process.communicate()

    # 로그 출력 및 프로세스 상태 확인
    # print(stderr.decode())
    if process.returncode == 0:
        print("Stream conversion successful")
    else:
        print(stderr.decode())
        print("Error in stream conversion")
    return rtmp_url