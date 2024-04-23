from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import subprocess
import os
import subprocess
import os
import json

def get_video_duration(input_path):
    # FFmpeg을 사용하여 비디오의 메타데이터를 추출
    cmd = [
        'ffmpeg',
        '-i', input_path,
        '-hide_banner',
        '-loglevel', 'error',
        '-f', 'null', '-'
    ]

    result = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    out, err = result.communicate()

    print("FFmpeg output:", out.decode('utf-8'))  # 디버깅을 위한 출력

    # 출력에서 비디오의 총 시간을 추출
    duration_line = [line for line in out.decode('utf-8').split('\n') if 'Duration' in line]
    if duration_line:
        duration_str = duration_line[0].split(',')[0].split(' ')[3]
        duration_parts = duration_str.split(':')
        duration = int(duration_parts[0]) * 3600 + int(duration_parts[1]) * 60 + float(duration_parts[2])
        return duration

    return 0  # 기본값



def convert_to_hls(input_path, output_path):
    # 비디오의 총 시간을 기반으로 HLS 세그먼트 길이 설정
    hls_time = 1

    # FFmpeg 명령어
    cmd = [
        'ffmpeg',
        '-y',
        '-i', input_path,
        '-vf', 'scale=1280:720',
        '-c:a', 'aac',
        '-c:v', 'libx264',
        '-hls_time', str(hls_time),
        '-hls_list_size', '6',
        '-hls_flags', 'delete_segments',
        '-start_number', '1',
        '-f', 'hls',
        '-hls_playlist_type', 'event',
        output_path
    ]

    subprocess.run(cmd)

@csrf_exempt
def upload_video(request):
    if request.method == 'POST':
        video_file = request.FILES.get('video')
        print(video_file, 'video_file')
        input_path = os.path.join('media', video_file.name)
        output_path = os.path.join('media', 'output.m3u8')
        print(input_path, 'input_path')
        print(output_path, 'output_path')

        # 업로드된 파일 저장
        with open(input_path, 'wb') as f:
            for chunk in video_file.chunks():
                f.write(chunk)

        # 비디오의 총 시간 추출
        duration = get_video_duration(input_path)
        print(f"Video duration: {duration} seconds")

        # HLS 변환
        convert_to_hls(input_path, output_path)

        return JsonResponse({'status': 'success'})

    return JsonResponse({'status': 'error'})
