// script.js

// 當網頁載入完成後會在 Console 顯示這段訊息
console.log("Hello, lilJdub! JavaScript is loaded correctly.");

// 你可以在這裡開始寫你的互動功能
const menuToggle = document.getElementById('menu-toggle');
const sidebarNav = document.getElementById('sidebar-nav');
const body = document.body;

// 定義點擊事件的處理函式
function toggleMenu() {
    // 切換 body 上的 'nav-open' class
    // 這個 class 會觸發 CSS 中的顯示/隱藏效果
    body.classList.toggle('nav-open');
}

// 為按鈕添加點擊監聽器
menuToggle.addEventListener('click', toggleMenu);

// (可選) 如果點擊導覽列連結後要關閉選單
const navLinks = sidebarNav.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // 確保點擊連結後選單會自動收起
        body.classList.remove('nav-open'); 
    });
});

//chatbot
// script.js (新增 Chatbot 邏輯)

// --- 1. 取得 DOM 元素 ---
const chatIcon = document.getElementById('chat-icon');
const chatWindow = document.getElementById('chat-window');
const chatCloseBtn = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

// --- 2. 視窗開關邏輯 ---

// 開啟/關閉聊天視窗
function toggleChat() {
    chatWindow.classList.toggle('chat-closed');
}

chatIcon.addEventListener('click', toggleChat);
chatCloseBtn.addEventListener('click', toggleChat);


// --- 3. 訊息處理與 API 呼叫 ---

// 顯示訊息到聊天視窗
function displayMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    
    // 自動捲動到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 處理發送訊息
async function sendMessage() {
    const userText = chatInput.value.trim();
    if (userText === '') return;

    // 1. 顯示使用者訊息
    displayMessage(userText, 'user');
    chatInput.value = ''; // 清空輸入欄

    // 2. 顯示機器人載入中
    displayMessage("思考中...", 'bot'); 
    
    // 移除載入中的訊息 (方便替換)
    const loadingMessage = chatMessages.lastChild;


    // --- 3. 呼叫 API 函式 (你需要修改這裡) ---
    try {
        const botResponse = await getBotResponse(userText);
        
        // 替換載入中的訊息
        chatMessages.removeChild(loadingMessage); 
        displayMessage(botResponse, 'bot');

    } catch (error) {
        console.error('API 呼叫錯誤:', error);
        loadingMessage.textContent = "不好意思，服務忙線中，請稍後再試。";
        loadingMessage.classList.add('bot-message'); // 確保樣式正確
    }
}

// 實際的 API 呼叫函式 
async function getBotResponse(prompt) {
    // 這是 API 模板，請替換成你的真實 API 服務
    const API_ENDPOINT = 'YOUR_API_ENDPOINT'; // 例如: https://api.openai.com/v1/chat/completions
    const API_KEY = 'YOUR_API_KEY'; // 從你的 AI 服務商獲取

    // 模擬 API 延遲和回應 (若沒有真實 API 可用此模擬)
    if (API_ENDPOINT === 'YOUR_API_ENDPOINT') {
         await new Promise(resolve => setTimeout(resolve, 1500));
         return `收到你的問題：「${prompt}」。由於我目前是模擬模式，我的回答是：lilJdub 是個熱愛網頁開發的學習者！`;
    }

    // --- 真實 API 呼叫範例 (例如使用 fetch) ---
    /*
    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}` 
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo", // 根據你使用的模型調整
            messages: [{ role: "user", content: prompt }]
        })
    });
    
    const data = await response.json();
    return data.choices[0].message.content; 
    */
}


// 點擊送出按鈕
chatSendBtn.addEventListener('click', sendMessage);

// 按下 Enter 鍵
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});