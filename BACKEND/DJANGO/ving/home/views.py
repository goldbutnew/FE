from django.http import JsonResponse
from django.db.models import Count
from .models import Viewer,User,StreamingRoom,Chatting,FixedChatting,RecordedVideo
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json

def current_viewer_count(request, room_id):
    viewer_count = Viewer.objects.filter(room_id=room_id).count()
    return JsonResponse({'current_viewer_count': viewer_count})


@api_view(['PATCH'])
def set_streaming_room_name(request, room_id):
    try:
        data = json.loads(request.body)
        new_name = data.get('new_name')

        if not new_name:
            return Response({'error': 'New room name is required'}, status=status.HTTP_400_BAD_REQUEST)

        room = StreamingRoom.objects.get(room_id=room_id)
        room.room_name = new_name
        room.save()

        return Response({'message': 'Streaming room name updated successfully'}, status=status.HTTP_200_OK)

    except StreamingRoom.DoesNotExist:
        return Response({'error': 'Streaming room not found'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)