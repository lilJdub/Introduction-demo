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