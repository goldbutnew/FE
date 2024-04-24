from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import subprocess
import os
import subprocess
import os
import json




# def convert_to_hls(input_path, output_path):
#     # 비디오의 총 시간을 기반으로 HLS 세그먼트 길이 설정
#     hls_time = 10
#     print(input_path,'convert_to_hls')
#     # FFmpeg 명령어
#     cmd = [
#         'ffmpeg',
#         '-y',
#         '-i', input_path,
#         '-vf', 'scale=1280:720',
#         '-c:a', 'aac',
#         '-c:v', 'libx264',
#         '-hls_time', str(hls_time),
#         '-hls_list_size', '6',
#         '-hls_flags', 'delete_segments',
#         '-start_number', '1',
#         '-f', 'hls',
#         '-hls_playlist_type', 'event',
#         output_path
#     ]

#     subprocess.run(cmd)


# def convert_to_hls(input_path, output_dir):
#     # 비트레이트 설정
#     bitrates = ['360k', '480k', '720k', '1080k']
    
#     for bitrate in bitrates:
#         output_path = os.path.join(output_dir, f'output_{bitrate}.m3u8')
#         print(output_path,'output_path')
#         # FFmpeg 명령어
#         cmd = [
#             'ffmpeg',
#             '-y',
#             '-i', input_path,
#             '-vf', f'scale=-1:{bitrate}',
#             '-c:a', 'aac',
#             '-c:v', 'libx264',
#             '-b:v', bitrate,
#             '-hls_time', '10',
#             '-hls_list_size', '6',
#             '-hls_flags', 'delete_segments',
#             '-start_number', '1',
#             '-f', 'hls',
#             '-hls_playlist_type', 'event',
#             output_path
#         ]

#         subprocess.run(cmd)
    
#     # 마스터 플레이리스트 생성
#     master_playlist_path = os.path.join(output_dir, 'master.m3u8')
#     if not os.path.exists(os.path.dirname(master_playlist_path)):
#         os.makedirs(os.path.dirname(master_playlist_path))
#     with open(master_playlist_path, 'w') as f:
#         for bitrate in bitrates:
#             f.write(f'#EXT-X-STREAM-INF:BANDWIDTH={int(bitrate.replace("k", ""))*1024}\n')
#             f.write(f'output_{bitrate}.m3u8\n')


# @csrf_exempt
# def upload_video(request):
#     if request.method == 'POST':
#         video_file = request.FILES.get('video')
#         print(video_file, 'video_file')
#         input_path = os.path.join('media', video_file.name)
#         output_path = os.path.join('media', 'output.m3u8')
#         print(input_path, 'input_path')
#         print(output_path, 'output_path')

#         # 업로드된 파일 저장
#         with open(input_path, 'wb') as f:
#             for chunk in video_file.chunks():
#                 f.write(chunk)

#         # 비디오의 총 시간 추출
   

#         # HLS 변환
#         convert_to_hls(input_path, output_path)

#         return JsonResponse({'status': 'success'})

#     return JsonResponse({'status': 'error'})





# import os
# import subprocess
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt

def create_ts_segment(input_file_name, output_dir, segment_index):
    ts_output_path = os.path.join(output_dir, f'segment_{segment_index:03d}.ts')
    output_path = f'segment_{segment_index:03d}.ts'
    input_path = os.path.join('media', input_file_name)
    print(1)
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)  # 존재하지 않는 디렉토리 생성
    print(2,output_path)
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
    print(3)
    # process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    # out, err = process.communicate()
    # print(4)
    # if process.returncode != 0:
    #     print(f"Error running ffmpeg: {err.decode()}")
    #     return None  # 오류 발생 시 None 반환
    return output_path


def append_to_m3u8(ts_file_path, m3u8_path):
    if ts_file_path and os.path.exists(ts_file_path):
        print('adkfjadkf')
        with open(m3u8_path, 'a') as f:
            f.write(f'#EXTINF:2.000,\n{ts_file_path}\n')

@csrf_exempt
def upload_video(request):
    if request.method == 'POST':
        video_file = request.FILES.get('video')
        input_file_name = video_file.name
        output_dir = 'media'
        m3u8_path = os.path.join(output_dir, 'output.m3u8')
        print(input_file_name, 'input_file_name')

        with open(os.path.join(output_dir, input_file_name), 'wb') as f:
            for chunk in video_file.chunks():
                f.write(chunk)
        print(987987)

        segment_index = 0  # 세그먼트 인덱스 관리 필요
        print(input_file_name,'input_file_name')
        print(output_dir,'output_dir')
        ts_file_path = create_ts_segment(input_file_name, output_dir, segment_index)
        print(11111111111111)
        if not ts_file_path:
            return JsonResponse({'status': 'error', 'message': 'Failed to create TS segment'})
        print(22222222222222222)
        # M3U8 파일 생성 또는 업데이트
        if not os.path.exists(m3u8_path):
            with open(m3u8_path, 'w') as f:
                f.write('#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-TARGETDURATION:10\n#EXT-X-MEDIA-SEQUENCE:0\n')
        print(ts_file_path,'ts_file_path')
        print(m3u8_path,'m3u8_path')
        append_to_m3u8(ts_file_path, m3u8_path)
        print(333333333)
        return JsonResponse({'status': 'success'})

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})