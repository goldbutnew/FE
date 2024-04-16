from django.http import JsonResponse
from django.db.models import Count
from .models import Viewer,User,StreamingRoom,Chatting,FixedChatting,RecordedVideo
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db import IntegrityError
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
    



@api_view(['PATCH'])
def set_streaming_room_is_adult(request, room_id):
    if request.method == 'PATCH':
        data = json.loads(request.body)
        is_adult = data.get('isAdult', None)
        
        if is_adult is None:
            return Response({'error': 'isAdult field is required'}, status=400)
        
        streaming_room = get_object_or_404(StreamingRoom, room_id=room_id)
        streaming_room.room_age_limit = is_adult
        streaming_room.save()
        
        return Response({'message': 'Streaming room updated successfully'}, status=200)
    

# user_id특정하는 방법 추가해야됨
@api_view(['POST'])
def create_streaming_room(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        room_name = data.get('roomName', None)
        is_adult = data.get('isAdult', None)
        thumbnail = data.get('thumbnail', None)
        
        if room_name is None or is_adult is None or thumbnail is None:
            return Response({'error': 'roomName, isAdult, thumbnail fields are required'}, status=400)
        
        streaming_room = StreamingRoom(room_name=room_name, room_age_limit=is_adult, room_thumbnail=thumbnail)
        streaming_room.save()
        
        return Response({'message': 'Streaming room created successfully', 'room_id': streaming_room.room_id}, status=201)
    


#S3로 바꿔야됨
@api_view(['PATCH'])
def update_streaming_room_thumbnail(request, room_id):
    data = json.loads(request.body)
    thumbnail = data.get('thumbnail', None)

    if not thumbnail:
        return Response({'message': 'Thumbnail is required'}, status=400)

    try:
        
        streaming_room = StreamingRoom.objects.get(room_id=room_id)
        
        
        streaming_room.room_thumbnail = thumbnail
        streaming_room.save()

        return Response({'message': 'Streaming room thumbnail updated successfully'}, status=200)
    except StreamingRoom.DoesNotExist:
        return Response({'message': 'Streaming room not found'}, status=404)
    except IntegrityError as e:
        return Response({'message': str(e)}, status=400)
    

# 영상으로 저장하는 로직 추가해야됨
@api_view(['DELETE'])
def delete_streaming_room(request, room_id):
    try:
        
        streaming_room = StreamingRoom.objects.get(room_id=room_id)
    except StreamingRoom.DoesNotExist:
        
        return Response({"message": "StreamingRoom does not exist"}, status=status.HTTP_404_NOT_FOUND)

    # StreamingRoom 삭제
    streaming_room.delete()

    return Response({"message": "StreamingRoom deleted successfully"}, status=status.HTTP_204_NO_CONTENT)




@api_view(['PATCH'])
def update_user_blocked_status(request):
    
    data = json.loads(request.body)
    isBlocked = data.get('isBlocked', None)
    userId = data.get('userId', None)

    if isBlocked is None or userId is None:
        return Response({"message": "isBlocked and userId are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        
        viewer = Viewer.objects.get(viewer_id=userId)
    except Viewer.DoesNotExist:
        
        return Response({"message": "Viewer does not exist"}, status=status.HTTP_404_NOT_FOUND)

    # isBlocked 상태 변경
    viewer.isblocked = isBlocked
    viewer.save()

    return Response({"message": f"User {userId} isBlocked status updated successfully"}, status=status.HTTP_200_OK)