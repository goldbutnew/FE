from django.http import HttpResponse
from .tasks import convert_stream_to_hls

def main(request):
    # user_id = request.user.id  # 예시로 사용자 ID를 가져옴
    resolutions = ['720p']
    user_name = "qudtls"
    print(user_name,3111111111)
    for resolution in resolutions:
        output_path = f"/files/{user_name}_{resolution}.m3u8"
        convert_stream_to_hls(user_name, resolution, output_path)
    return HttpResponse("Tasks have been sent to Celery for processing.")