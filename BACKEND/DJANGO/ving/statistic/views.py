from django.http import JsonResponse

from django.shortcuts import render
from home.models import User
from .models import RecordedVideo
from rest_framework.decorators import api_view
from mongoengine import Document, DictField
import pymongo
from .models import MongoInfo,MongoFood
import json
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods

from django.conf import settings
# Create your views here.

from django_apscheduler.jobstores import register_events, register_job

from . import scheduler

@api_view(['GET'])
def play_count(request):
    decoded_data = json.loads(request.body.decode('utf-8'))
    user_name = decoded_data.get('username')
    user = User.objects.get(user_username = user_name)
    user_id = user.user_id

    recored_video = RecordedVideo.objects.filter(user_id=user_id)
    # play count
    cnt = 0
    for video in recored_video:
        cnt += video.videoplay

    return JsonResponse({'playCount': cnt})

@api_view(['GET'])
def total_viewer(request):
    decoded_data = json.loads(request.body.decode('utf-8'))
    user_name = decoded_data.get('username')
    user = User.objects.get(user_username = user_name)
    user_id = user.user_id


@api_view(['GET'])
def test(request):
    # mongo_db = MongoInfo.objects.all()
    # mongo_food = MongoFood.objects.all()
    # print(22222)
    # cnt = 0
    # for i in mongo_db:
    #     print(i)
    #     cnt +=1
    #     if cnt == 10 :
    #         break
    
    # for i in mongo_food:
    #     print(i,22)
    #     cnt +=1
    #     if cnt == 10:
    #         break
    scheduler.start()
    
    return JsonResponse({'test': 'success'})

# def scheduled_job():
#     print("Scheduled job running every 5 seconds")

# 스케줄러에 작업 등록
# register_job(scheduler, 'scheduled_job', 'interval', seconds=5)
# register_events(scheduler)