# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Chatting(models.Model):
    chat_id = models.AutoField(primary_key=True)
    viewer = models.ForeignKey('Viewer', models.DO_NOTHING)
    chat_content = models.CharField(max_length=50)
    donation = models.PositiveIntegerField(blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'chatting'


class FixedChatting(models.Model):
    chat_room_id = models.AutoField(primary_key=True)
    room = models.ForeignKey('StreamingRoom', models.DO_NOTHING)
    chat = models.ForeignKey(Chatting, models.DO_NOTHING)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'fixed_chatting'


class RecordedVideo(models.Model):
    video_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('User', models.DO_NOTHING)
    video_is_public = models.IntegerField()
    videoplay = models.PositiveIntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'recorded_video'


class StreamingRoom(models.Model):
    room_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('User', models.DO_NOTHING)
    room_name = models.CharField(max_length=50)
    room_age_limit = models.IntegerField(blank=True, null=True)
    room_thumbnail = models.CharField(max_length=255)
    is_end = models.IntegerField(null=False)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()


    class Meta:
        managed = False
        db_table = 'streaming_room'




class Notice(models.Model):
    notice_id = models.AutoField(primary_key=True)
    follow_id = models.ForeignKey('User', on_delete=models.CASCADE)
    class Status(models.TextChoices):
        STREAMING = 'streaming', 'Streaming'
        RECORDING = 'recording', 'Recording'
    notice_content = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.STREAMING,
    )
    class Meta:
        managed = False
        db_table = 'notice'



class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_username = models.CharField(max_length=20)
    user_password = models.CharField(max_length=64)
    user_nickname = models.CharField(max_length=20)
    user_registered_date = models.DateTimeField()
    user_isregistered = models.IntegerField()
    user_leave_date = models.DateTimeField()
    user_photo = models.CharField(max_length=200, blank=True, null=True)
    user_introduction = models.CharField(max_length=150, blank=True, null=True)
    user_donated = models.PositiveIntegerField(blank=True, null=True)
    user_choco = models.PositiveIntegerField(blank=True, null=True)
    user_subscriber_count = models.PositiveIntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'user'


class Viewer(models.Model):
    viewer_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, models.DO_NOTHING)
    room = models.ForeignKey(StreamingRoom, models.DO_NOTHING)
    viewer_isliked = models.IntegerField()
    isblocked = models.IntegerField()
    isadmin = models.IntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'viewer'


