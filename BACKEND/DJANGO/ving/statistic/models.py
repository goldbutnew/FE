
# from django.db import models

# class RecordedVideo(models.Model):
#     video_id = models.AutoField(primary_key=True)
#     viewer = models.ForeignKey('Viewer', models.DO_NOTHING)
#     chat_content = models.CharField(max_length=50)
#     donation = models.PositiveIntegerField(blank=True, null=True)
#     created_at = models.DateTimeField()
#     updated_at = models.DateTimeField()

#     class Meta:
#         managed = False
#         db_table = 'chatting'