from django.http import HttpResponse, JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from .models import Stream
import json

@csrf_exempt
def start_stream(request):
    if request.method == 'POST':
        try:
            print('start stream')
            data = json.loads(request.body.decode('utf-8'))
            stream_id = data.get('stream_id')
            
            if not Stream.objects.filter(id=stream_id).exists():
                Stream.objects.create(id=stream_id)
            
            return HttpResponse('Stream started', status=200)
        except json.JSONDecodeError:
            return HttpResponse('Invalid JSON data', status=400)
        except Exception as e:
            return HttpResponse(f'Error: {e}', status=500)

@csrf_exempt
def end_stream(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            stream_id = data.get('stream_id')
            
            Stream.objects.filter(id=stream_id).delete()
            
            return HttpResponse('Stream ended', status=200)
        except json.JSONDecodeError:
            return HttpResponse('Invalid JSON data', status=400)
        except Exception as e:
            return HttpResponse(f'Error: {e}', status=500)
