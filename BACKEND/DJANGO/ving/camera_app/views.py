from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import subprocess
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

def create_ts_segment(input_file_name, output_dir, segment_index):
    ts_output_path = os.path.join(output_dir, f'segment_{segment_index:03d}.ts')
    input_path = os.path.join(MEDIA_ROOT, input_file_name)
    output_path = f'segment_{segment_index:03d}.ts'
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)  # 존재하지 않는 디렉토리 생성

    cmd = [
        'ffmpeg',
        '-y',
        '-i', input_path,
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-t', '2',  # 지속 시간
        '-f', 'mpegts',
        ts_output_path
    ]
    subprocess.run(cmd)
    return output_path 

def append_to_m3u8(ts_file_path, m3u8_path):
    print('append_to_m3u8')
    print(ts_file_path,m3u8_path)
    with open(m3u8_path, 'a') as f:
            f.write(f'#EXTINF:2.000,\n{ts_file_path}\n')
    # if ts_file_path and os.path.exists(ts_file_path):
    #     print('exists')
    #     with open(m3u8_path, 'a') as f:
    #         f.write(f'#EXTINF:2.000,\n{ts_file_path}\n')

    # print('not-exists')

@csrf_exempt
def upload_video(request):
    if request.method == 'POST':
        video_file = request.FILES.get('video')
        input_file_name = video_file.name
        output_dir = 'media'
        m3u8_path = os.path.join('media', 'output.m3u8')
        print('upload_1')
        with open(os.path.join('media', input_file_name), 'wb') as f:
            for chunk in video_file.chunks():
                f.write(chunk)
        print('upload_2')

        segment_index = 0  # 세그먼트 인덱스 관리 필요
        ts_file_path = create_ts_segment(input_file_name, output_dir, segment_index)
        print('upload_3')

        if not ts_file_path:
            return JsonResponse({'status': 'error', 'message': 'Failed to create TS segment'})

        if not os.path.exists(m3u8_path):
            with open(m3u8_path, 'w') as f:
                f.write('#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-TARGETDURATION:10\n#EXT-X-MEDIA-SEQUENCE:0\n')
        print('upload_4')

        # 기존 M3U8 파일에 새 세그먼트 추가
        append_to_m3u8(ts_file_path, m3u8_path)

        return JsonResponse({'status': 'success'})

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})


@csrf_exempt
def get_ts_segment(request, sequence):
    segment_filename = f'segment_{sequence:03d}.ts'
    segment_path = os.path.join(MEDIA_ROOT, segment_filename)

    if os.path.exists(segment_path):
        with open(segment_path, 'rb') as f:
            ts_content = f.read()

        response = HttpResponse(ts_content, content_type='video/mp2t')
        response['Content-Disposition'] = f'inline; filename="{segment_filename}"'
        return response
    else:
        return HttpResponse(status=404)
