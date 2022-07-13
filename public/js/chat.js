$(document).ready(() => {

    const socket = io();

    $("#chatForm").submit(() => {
        let text = $("#chat-input").val(),
        userName = $("#chat-user-name").val(),
        userId = $("#chat-user-id").val();

        socket.emit("message", {
          content: text,
          userName: userName,
          userId: userId
        });
        
        $("#chat-input").val("");
        return false;
      });  

    // socket.on("message", (message) => {
    //     displayMessage(message);
    // });

    socket.on("message", (message) => {
      displayMessage(message);
      for (let i = 0; i < 2; i++) {
      $("#chat-icon").fadeOut(200).fadeIn(200);
      }
      });

    socket.on("load all messages", data => {
      data.forEach(message => {
        displayMessage(message);
      });
    });

    let displayMessage = message => {
      $("#chat").prepend(
        $("<li>").html(`
          <strong class="message ${getCurrentUserClass(message.user)}">
            ${message.userName}
          </strong>: ${message.content}
        `)
      );
    };

   let getCurrentUserClass = (id) => {
     let userId = $("#chat-user-id").val();
     return userId === id ? "current-user": "";
   };
});

