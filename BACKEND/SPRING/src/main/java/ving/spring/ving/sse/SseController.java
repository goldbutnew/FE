package ving.spring.ving.sse;


import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @PostMapping("/start-stream")
    public ResponseEntity<?> startStream(@RequestParam String name, @RequestParam String addr, @RequestParam String clientid) {
        updateStreamStatus(name, "live");
        log.info(name + " 의 방송 시작 " +addr + " 주소 " + clientid + " 클라이언트 id" );
        notifyClients(name, "start");
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("/stop-stream")
    public ResponseEntity<?> stopStream(@RequestParam String name, @RequestParam String addr, @RequestParam String clientid) {
        updateStreamStatus(name, "stopped");
        log.info(name + " 의 방송 종료 " +addr + " 주소 " + clientid + " 클라이언트 id" );
        notifyClients(name, "stop");
        return ResponseEntity.ok(HttpStatus.OK);
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
