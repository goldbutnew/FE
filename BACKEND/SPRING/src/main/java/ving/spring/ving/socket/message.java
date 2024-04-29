package ving.spring.ving.socket;

public record message(String type, String sender, Object data) {
}
