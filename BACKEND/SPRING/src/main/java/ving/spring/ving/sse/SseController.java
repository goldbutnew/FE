package ving.spring.ving.sse;


import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Slf4j
@RestController
@RequestMapping("/api/sse")
public class SseController {
    private final Map<String, CopyOnWriteArrayList<SseEmitter>> emittersMap = new ConcurrentHashMap<>();
    @GetMapping("/start-stream")
    public void startStream(@RequestParam String name, @RequestParam String addr, @RequestParam String clientid) {
        updateStreamStatus(name, "live");
        log.info(name + " 의 방송 시작 " +addr + " 주소 " + clientid + " 클라이언트 id" );
        notifyClients(name, "start");
    }

    @GetMapping("/stop-stream")
    public void stopStream(@RequestParam String name, @RequestParam String addr, @RequestParam String clientid) {
        updateStreamStatus(name, "stopped");
        log.info(name + " 의 방송 종료 " +addr + " 주소 " + clientid + " 클라이언트 id" );
        notifyClients(name, "stop");
    }
    @GetMapping("/stream-status/{streamKey}")
    public SseEmitter streamStatus(@PathVariable String streamKey)
    {
        SseEmitter emitter = new SseEmitter();
        emittersMap.computeIfAbsent(streamKey, k -> new CopyOnWriteArrayList<>()).add(emitter);
        emitter.onCompletion(() -> emittersMap.get(streamKey).remove(emitter));
        emitter.onTimeout(() -> emittersMap.get(streamKey).remove(emitter));
        return emitter;
    }

    public void notifyClients(String streamKey, String status)
    {
        CopyOnWriteArrayList<SseEmitter> emitters = emittersMap.get(streamKey);
        if (emitters != null)
        {
            emitters.forEach(emitter ->
            {
                try {
                    emitter.send(SseEmitter.event().name("stream-status")
                            .data(new StreamStatus(streamKey, status))
                    );
                } catch (IOException e)
                {
                    emitter.completeWithError(e);
                }
            });
        }
    }

    public void updateStreamStatus(String streamKey, String status)
    {
        log.info("Stream " + streamKey + " is now " + status);
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    static class StreamStatus {
        private String streamKey;
        private String status;
    }
}
