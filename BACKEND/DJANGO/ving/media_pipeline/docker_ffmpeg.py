

# import subprocess
# from multiprocessing import Process

# def convert_stream_to_hls(user_id):
#     container_name = "ffmpeg"
    
#     output_paths = [
#         f"/files/{user_id}_480p.m3u8",
#         f"/files/{user_id}_720p.m3u8",
#         f"/files/{user_id}_360p.m3u8",
#     ]

#     qualities = [
#         {'resolution': '854x480', 'bitrate': '1200k', 'port': '1938'},
#         {'resolution': '1280x720', 'bitrate': '2500k', 'port': '1936'},
#         {'resolution': '640x360', 'bitrate': '800k', 'port': '1937'},
#     ]

#     # rtmp_urls = [
#     #     f"rtmp://0.0.0.0:1935/live/{user_id}_720p",
#     #     f"rtmp://0.0.0.0:1935/live/{user_id}_360p",
#     #     f"rtmp://0.0.0.0:1935/live/{user_id}_480p"
#     # ]
#     rtmp_urls = [
#         f"rtmp://0.0.0.0:1935/live/{user_id}_480p",
#         f"rtmp://0.0.0.0:1935/live/{user_id}_720p",
#         f"rtmp://0.0.0.0:1935/live/{user_id}_360p",
#     ]

#     processes = []

#     for output_path, quality, rtmp_url in zip(output_paths, qualities, rtmp_urls):
#         command = [
#             'docker', 'exec', container_name, 'ffmpeg',
#             '-listen', '1',
#             '-i', rtmp_url,
#             '-c:v', 'libx264',
#             '-preset', 'fast',
#             '-tune', 'zerolatency',
#             '-c:a', 'aac',
#             '-b:a', '128k',
#             '-vf', f'scale={quality["resolution"]}',
#             '-b:v', quality['bitrate'],
#             '-f', 'hls',
#             '-hls_time', '1',
#             '-hls_list_size', '10',
#             output_path
#         ]
#         process = Process(target=subprocess.run, args=(command,))
#         process.start()
#         print(1111111111)
#         processes.append(process)

#     for process in processes:
#         process.join()

#     print("All processes completed.")



import subprocess

def convert_stream_to_hls(user_id):
    container_name = "ffmpeg"
    
    output_paths = [
        f"/files/{user_id}_720p.m3u8",
        # f"/files/{user_id}_360p.m3u8",
        # f"/files/{user_id}_480p.m3u8",
    ]

    qualities = [
    {'resolution': '1280x720', 'bitrate': '2500k', 'port': '1936'},
    {'resolution': '640x360', 'bitrate': '800k', 'port': '1937'},
    {'resolution': '854x480', 'bitrate': '1200k', 'port': '1938'},
        # {'resolution': '1280x720', 'bitrate': '2500k'},
        # {'resolution': '640x360', 'bitrate': '800k'},
        # {'resolution': '854x480', 'bitrate': '1200k'},
    ]

    rtmp_urls = [
        f"rtmp://0.0.0.0:1935/live/{user_id}_720p",
        # f"rtmp://0.0.0.0:1935/live/{user_id}_360p",
        # f"rtmp://0.0.0.0:1935/live/{user_id}_480p"
    ]
    # rtmp_urls = [
    #     f"rtmp://0.0.0.0:{qualities[0]['port']}/live/{user_id}_720p",
    #     f"rtmp://0.0.0.0:{qualities[1]['port']}/live/{user_id}_360p",
    #     f"rtmp://0.0.0.0:{qualities[2]['port']}/live/{user_id}_480p"
    # ]


    processes = []

    for output_path, quality, rtmp_url in zip(output_paths, qualities, rtmp_urls):
        command = [
            'docker', 'exec', container_name, 'ffmpeg',
            '-listen', '1',
            '-i', rtmp_url,  # Listening flag removed if not needed
            '-c:v', 'libx264',
            '-preset', 'fast',
            '-tune', 'zerolatency',
            '-c:a', 'aac',
            '-b:a', '128k',
            '-vf', f'scale={quality["resolution"]}',
            '-b:v', quality['bitrate'],
            '-f', 'hls',
            '-hls_time', '1',
            '-hls_list_size', '10',
            output_path
        ]
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print(11111111111)
        processes.append(process)
    print(33333)
    for process in processes:
        stdout, stderr = process.communicate()
        print(f"STDOUT: {stdout.decode()}")
        print(f"STDERR: {stderr.decode()}")
        if process.returncode == 0:
            print("Stream conversion successful")
        else:
            print("Error in stream conversion")

