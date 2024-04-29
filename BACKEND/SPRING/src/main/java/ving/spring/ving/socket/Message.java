package ving.spring.ving.socket;

public record Message(String type, String sender, Object data) {
}
