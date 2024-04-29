import os
import subprocess
from django.http import HttpResponse
from camera_app.models import Stream
import m3u8

def generate_hls_chunks(request, stream_id):
    try:
        stream = Stream.objects.get(id=stream_id)
    except Stream.DoesNotExist:
        return HttpResponse("Stream not found", status=404)

    ffmpeg_path = 'C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe'
    if not os.path.exists('media'):
        os.makedirs('media')

    cmd = [
        ffmpeg_path,
        '-f', 'video4linux2',
        '-i', '/dev/video0',  # 카메라 디바이스 경로로 변경
        '-c:v', 'copy',
        '-c:a', 'copy',
        '-hls_time', '10',
        '-hls_list_size', '6',
        '-hls_flags', 'delete_segments',
        '-hls_segment_filename', 'media/segment_%03d.ts',
        'media/output.m3u8'
    ]

    subprocess.Popen(cmd)  # 이제 이 함수는 백그라운드에서 실행되어야 함
    return HttpResponse("Streaming started", status=200)




def stream_hls(request, stream_id):
    try:
        stream = Stream.objects.get(id=stream_id)
    except Stream.DoesNotExist:
        return HttpResponse("Stream not found", status=404)

    playlist = m3u8.M3U8()
    base_url = 'http://localhost:8000/hls/stream_hls/{}/'.format(stream_id)

    for i in range(6):  # 예를 들어 6개의 세그먼트 파일이 있다면
        segment = m3u8.Segment(uri=f'segment_{i}.ts')
        segment.base_uri = base_url
        playlist.segments.append(segment)

    m3u8_data = playlist.dumps()

    return HttpResponse(m3u8_data, content_type='application/vnd.apple.mpegurl')