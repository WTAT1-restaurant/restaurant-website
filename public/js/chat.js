$(document).ready(() => {

    const socket = io();

    $("#chatForm").submit((e) => {
        socket.emit("message");
        $("#chat-input").val("");
        return false;
    });
    socket.on("message", (message) => {
        displayMessage(message.content);
    });
    let displayMessage = (message) => {
        $("#chat").prepend($("<li>").html(message));
    };
});