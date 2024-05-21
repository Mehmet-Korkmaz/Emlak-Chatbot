document.addEventListener("DOMContentLoaded", function() {
    const sendButton = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    
    
    fetch('Soru_Cevap.json')
        .then(response => response.json())
        .then(data => {
            const questions = data; 

           
            appendMessage("bot", "Merhaba. Ben Emlak Bilge, nasıl yardımcı olabilirim?");

            sendButton.addEventListener("click", function() {
                sendMessage(questions);
            });
            
            userInput.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                    sendMessage(questions);
                }
            });
        })
        .catch(error => console.error('Error loading questions:', error));

    function sendMessage(questions) {
        const message = userInput.value.trim().toLowerCase(); 
        if (message === "") return; 

        const response = generateResponse(message, questions);
        appendMessage("user", userInput.value);
        appendMessage("bot", response);
        
        userInput.value = ""; 
    }
   
    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.innerText = message;
        chatBox.appendChild(messageElement);
        
        const spacerElement = document.createElement("div");
        spacerElement.classList.add("spacer");
        chatBox.appendChild(spacerElement);
    
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    function generateResponse(message, questions) {
        for (const question of questions) {
            if (message.includes(question.Soru.toLowerCase())) {
                return question.Cevap;
            }
        }
        return "Üzgünüm, bu konuda bilgi veremiyorum. Daha açıklayıcı bir soru sorabilir misiniz?";
    }
});