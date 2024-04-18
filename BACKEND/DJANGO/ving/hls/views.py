import os
import subprocess
from django.http import StreamingHttpResponse

def generate_hls_chunks(media_file_path):
    # 상대 경로를 절대 경로로 변환
    absolute_media_file_path = os.path.abspath(media_file_path)
    
    # ffmpeg의 절대 경로
    ffmpeg_path = 'C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe'  # 실제 설치된 경로에 맞게 변경해주세요
    print(2)
    # media 디렉토리 생성
    if not os.path.exists('media'):
        os.makedirs('media')
    
    # HLS 청크 생성을 위한 FFmpeg 명령어
    cmd = [
        ffmpeg_path,
        '-i', absolute_media_file_path,
        '-c:v', 'copy',
        '-c:a', 'copy',
        '-hls_time', '10',
        '-hls_list_size', '6',
        '-hls_flags', 'delete_segments',
        '-hls_segment_filename', 'media/segment_%03d.ts',
        'media/output.m3u8'
    ]
    
    subprocess.run(cmd)
    
    # 생성된 청크 경로를 읽어서 리스트로 반환
    chunks = []
    for i in range(6):
        chunks.append(f'/media/segment_{i:03d}.ts')
    
    return chunks

def stream_hls(request):
    media_file_path = 'bunny.mp4'
    print(1)
    # 미디어 파일을 청크로 분할
    chunks = generate_hls_chunks(media_file_path)
    
    response = StreamingHttpResponse(chunks, content_type='application/vnd.apple.mpegurl')
    return response
