# from django.http import JsonResponse, HttpResponse
# from django.views.decorators.csrf import csrf_exempt
# import subprocess
# import os

# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# def create_ts_segment(input_file_name, output_dir, segment_index):
#     ts_output_path = os.path.join(output_dir, f'segment_{segment_index:03d}.ts')
#     input_path = os.path.join(MEDIA_ROOT, input_file_name)
#     output_path = f'segment_{segment_index:03d}.ts'
    
#     if not os.path.exists(output_dir):
#         os.makedirs(output_dir)  # 존재하지 않는 디렉토리 생성

#     cmd = [
#         'ffmpeg',
#         '-y',
#         '-i', input_path,
#         '-c:v', 'libx264',
#         '-c:a', 'aac',
#         '-t', '2',  # 지속 시간
#         '-f', 'mpegts',
#         ts_output_path
#     ]
#     subprocess.run(cmd)
#     return output_path 

# def append_to_m3u8(ts_file_path, m3u8_path):
#     print('append_to_m3u8')
#     print(ts_file_path,m3u8_path)
#     with open(m3u8_path, 'a') as f:
#             f.write(f'#EXTINF:2.000,\n{ts_file_path}\n')
#     # if ts_file_path and os.path.exists(ts_file_path):
#     #     print('exists')
#     #     with open(m3u8_path, 'a') as f:
#     #         f.write(f'#EXTINF:2.000,\n{ts_file_path}\n')

#     # print('not-exists')

# @csrf_exempt
# def upload_video(request):
#     if request.method == 'POST':
#         video_file = request.FILES.get('video')
#         print(video_file,'video_file')
#         input_file_name = video_file.name
#         output_dir = 'media'
#         m3u8_path = os.path.join('media', 'output.m3u8')
#         print('upload_1')
#         with open(os.path.join('media', input_file_name), 'wb') as f:
#             for chunk in video_file.chunks():
#                 f.write(chunk)
#         print('upload_2')

#         segment_index = 0  # 세그먼트 인덱스 관리 필요
#         ts_file_path = create_ts_segment(input_file_name, output_dir, segment_index)
#         print('upload_3')

#         if not ts_file_path:
#             return JsonResponse({'status': 'error', 'message': 'Failed to create TS segment'})

#         if not os.path.exists(m3u8_path):
#             with open(m3u8_path, 'w') as f:
#                 f.write('#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-TARGETDURATION:10\n#EXT-X-MEDIA-SEQUENCE:EVENT\n')
#         print('upload_4')

#         # 기존 M3U8 파일에 새 세그먼트 추가
#         append_to_m3u8(ts_file_path, m3u8_path)

#         return JsonResponse({'status': 'success'})

#     return JsonResponse({'status': 'error', 'message': 'Invalid request method'})


# @csrf_exempt
# def get_ts_segment(request, sequence):
#     segment_filename = f'segment_{sequence:03d}.ts'
#     segment_path = os.path.join(MEDIA_ROOT, segment_filename)

#     if os.path.exists(segment_path):
#         with open(segment_path, 'rb') as f:
#             ts_content = f.read()

#         response = HttpResponse(ts_content, content_type='video/mp2t')
#         response['Content-Disposition'] = f'inline; filename="{segment_filename}"'
#         return response
#     else:
#         return HttpResponse(status=404)

from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import subprocess
import os
from ffmpeg_streaming import Formats, Bitrate, Representation, Size

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
segment_index = 0
_360p = Representation(Size(640, 360), Bitrate(276 * 1024, 128 * 1024))
_480p = Representation(Size(854, 480), Bitrate(750 * 1024, 192 * 1024))
_720p = Representation(Size(1280, 720), Bitrate(2048 * 1024, 320 * 1024))

def create_ts_segment(input_file_name, output_dir, segment_index):
    ts_output_path = os.path.join(output_dir, f'segment_{segment_index:010d}.ts')
    # ts_output_path = os.path.join(output_dir, f'segment_{segment_index:010d}_{representation.size.width}x{representation.size.height}.ts')
    input_path = os.path.join(MEDIA_ROOT, input_file_name)
    output_path = f'segment_{segment_index:010d}.ts'
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)  # 존재하지 않는 디렉토리 생성

    # cmd = [
    #     'ffmpeg',
    #     '-y',
    #     '-i', input_path,
    #     '-c:v', 'libx264',
    #     '-c:a', 'aac',
    #     '-vf', f'scale={representation.size.width}:{representation.size.height}',
    #     '-b:v', f'{representation.bitrate.video}',
    #     '-b:a', f'{representation.bitrate.audio}',
    #     '-t', '2',  # 지속 시간
    #     '-f', 'mpegts',
    #     ts_output_path
    # ]
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

# def append_to_m3u8(ts_file_path, m3u8_path):
#     with open(m3u8_path, 'a') as f:
#         f.write(f'#EXT-X-STREAM-INF:BANDWIDTH={representation.bitrate.video + representation.bitrate.audio},RESOLUTION={representation.size.width}x{representation.size.height}\n')
#         f.write(f'segment_{ts_file_path.split("_")[-2]}_{representation.size.width}x{representation.size.height}.ts\n')

#     # Update EXT-X-TARGETDURATION value based on segment duration (2 seconds in this case)
#     with open(m3u8_path, 'r+') as f:
#         lines = f.readlines()
#         for i, line in enumerate(lines):
#             if line.strip().startswith('#EXT-X-TARGETDURATION'):
#                 lines[i] = '#EXT-X-TARGETDURATION:2\n'
#         f.seek(0)
#         f.writelines(lines)
def append_to_m3u8(ts_file_path, m3u8_path):
    print('append_to_m3u8')
    print(ts_file_path,m3u8_path)
    with open(m3u8_path, 'a') as f:
            f.write(f'#EXTINF:2.000,\n{ts_file_path}\n')
    print('writed')


@csrf_exempt
def upload_video(request):
    if request.method == 'POST':
        video_file = request.FILES.get('video')
        input_file_name = video_file.name
        output_dir = 'media'
        m3u8_path = os.path.join('media', 'output.m3u8')

        with open(os.path.join('media', input_file_name), 'wb') as f:
            for chunk in video_file.chunks():
                f.write(chunk)

        # 기존 M3U8 파일이 없는 경우 생성
        if not os.path.exists(m3u8_path):
            with open(m3u8_path, 'w') as f:
                f.write('#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-TARGETDURATION:2\n#EXT-X-MEDIA-SEQUENCE:0\n')

        # 기존 M3U8 파일 읽기
        with open(m3u8_path, 'r') as f:
            m3u8_content = f.readlines()

        # EXT-X-MEDIA-SEQUENCE 값 찾기
        sequence_line = next((line for line in m3u8_content if line.startswith('#EXT-X-MEDIA-SEQUENCE')), None)
        current_sequence = 0
        if sequence_line:
            current_sequence = int(sequence_line.split(':')[-1])
        
        current_sequence += 1  # EXT-X-MEDIA-SEQUENCE 값 증가
        ts_file_path = create_ts_segment(input_file_name, output_dir, current_sequence)

        # EXT-X-MEDIA-SEQUENCE 값 업데이트
        new_m3u8_content = [line if not line.startswith('#EXT-X-MEDIA-SEQUENCE') else f'#EXT-X-MEDIA-SEQUENCE:{current_sequence}\n' for line in m3u8_content]
        with open(m3u8_path, 'w') as f:
            f.writelines(new_m3u8_content)
        # 이미 재생된 ts파일 지우는거
        # with open(m3u8_path, 'r') as f:
        #     lines = f.readlines()

        #     cnt = 0
        #     modified_lines = []

        #     for line in lines:
        #         print(line.strip())  # 각 줄을 출력
                
        #         if line.startswith('#EXT-X-MEDIA-SEQUENCE'):
        #             cnt += 1
        #             modified_lines.append(line)
        #             continue

        #         if cnt == 1 or cnt == 2:
        #             line = ''  # 조건을 만족하는 경우 줄을 수정
        #         modified_lines.append(line)

        # # 수정된 줄을 원래 파일에 다시 쓰기
        # with open(m3u8_path, 'w') as f:
        #     for line in modified_lines:
        #         f.write(line)

        
        append_to_m3u8(ts_file_path, m3u8_path)
        return JsonResponse({'status': 'success'})

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})



@csrf_exempt
def get_ts_segment(request, sequence, resolution):
    segment_filename = f'segment_{sequence:010d}_{resolution}.ts'
    segment_path = os.path.join(MEDIA_ROOT, segment_filename)

    if os.path.exists(segment_path):
        with open(segment_path, 'rb') as f:
            ts_content = f.read()

        response = HttpResponse(ts_content, content_type='video/mp2t')
        response['Content-Disposition'] = f'inline; filename="{segment_filename}"'
        return response
    else:
        return HttpResponse(status=404)
