import subprocess

def convert_stream_to_hls(user_id):
    # 컨테이너 이름
    container_name = "ffmpeg"
    
    # RTMP URL과 HLS 출력 경로를 유저 ID에 따라 동적으로 생성
    rtmp_url = f"rtmp://0.0.0.0:1935/live/{user_id}"
    
    output_path = f"/files/{user_id}.m3u8"

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
    # subprocess를 사용하여 비동기로 ffmpeg 명령 실행
    process = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    # 로그 출력 (예시로 stderr만 출력)
    stdout, stderr = process.communicate()

    # 로그 출력 및 프로세스 상태 확인
    print(stderr.decode())
    if process.returncode == 0:
        print("Stream conversion successful")
    else:
        print("Error in stream conversion")
    return rtmp_url