document.addEventListener("DOMContentLoaded", () => {
    const messagesContainer = document.querySelector("#messages-container");
    const sendButton = document.querySelector("#send-btn");
    const messageInput = document.querySelector("#message-input");
    const clearHistoryBtn = document.querySelector("#clear-btn");

    // Блокирует отправку следующего сообщения, пока формируется ответ
    let sendingInProgress = false;

    // Добавляет новое сообщение в чат
    function addMessage(text, isUser) {
        let messageClass = isUser ? "user-message" : "bot-message";
        const messageItem = `
            <div class="message-item ${messageClass}">
                ${text}
            </div>
        `;
        messagesContainer.insertAdjacentHTML("beforeend", messageItem);
        messagesContainer.scrollTo({ top: messagesContainer.scrollHeight });
    }

    // Генерация ответа от бота
    function generateBotReply(userMessage) {
        switch(true) {
            case /привет/i.test(userMessage):
                return "Здравствуйте! Чем займемся сегодня?";
            
            case /как тебя зовут\??/i.test(userMessage):
                return "Меня зовут Violet Bot, рада знакомству!";
                
            case /помощь|help/i.test(userMessage):
                return "Вы можете спросить меня о чём угодно. Попробуйте задать простой вопрос.";
            
            default:
                return "Хмм... кажется, я не поняла вопроса. Повторите еще раз, пожалуйста.";
        }
    }

    // Имитация отправки сообщения и формирования ответа от бота
    function handleSendMessage() {
        const userText = messageInput.value.trim();
        if (!userText || sendingInProgress) return;

        // Ставим флаг отправки
        sendingInProgress = true;

        // Добавляем сообщение пользователя
        addMessage(userText, true);
        messageInput.value = '';

        // Показываем анимацию ожидания ответа
        showTypingIndicator();

        // Формирование ответа от бота с задержкой
        setTimeout(() => {
            hideTypingIndicator();
            const botResponse = generateBotReply(userText);
            addMessage(botResponse, false);
            sendingInProgress = false;
        }, 1500); // Задержка ответа (1.5 сек.)
    }

    // Показываем индикатор "Бот печатает..."
    function showTypingIndicator() {
        const indicator = `<div class="typing-indicator">Bot печатает...</div>`;
        messagesContainer.insertAdjacentHTML("beforeend", indicator);
        messagesContainer.scrollTo({ top: messagesContainer.scrollHeight });
    }

    // Скрываем индикатор
    function hideTypingIndicator() {
        const typingIndicator = document.querySelector(".typing-indicator");
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Обработка событий
    sendButton.addEventListener('click', handleSendMessage);
    messageInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    });
    clearHistoryBtn.addEventListener('click', () => {
        messagesContainer.innerHTML = '';
    });
});