# camera_app/consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer

class CameraConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        if message == 'start_stream':
            # 카메라 스트리밍 시작 로직
            pass
        elif message == 'stop_stream':
            # 카메라 스트리밍 중지 로직
            pass

    async def send_data(self, event):
        data = event['data']
        await self.send(text_data=json.dumps(data))
