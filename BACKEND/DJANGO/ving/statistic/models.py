
from django.db import models
from home.models import User,StreamingRoom
from mongoengine import Document, DictField

class RecordedVideo(models.Model):
    video_id = models.AutoField(primary_key=True)
    room = models.ForeignKey(StreamingRoom, on_delete = models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='home_recorded_videos')
    video_is_public = models.BooleanField(default=True)
    thumbnail = models.CharField(max_length=225)
    video_name = models.CharField(max_length=64)
    videoplay = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        managed = False
        db_table = 'recorded_video'



class MongoInfo(Document):
    info_per_minute = DictField()

class MongoFood(Document):
    food_recipe = DictField()