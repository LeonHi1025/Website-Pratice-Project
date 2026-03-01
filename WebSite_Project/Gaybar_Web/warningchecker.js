/* 
 * 當這份 HTML 網頁的骨架 (DOM) 完全載入完成後，這段程式碼才會開始執行。
 * 這樣可以確保我們使用 document.getElementById 抓取元素時，按鈕跟視窗確實存在於畫面上。
 */
document.addEventListener('DOMContentLoaded', function () {

    // 步驟 1：先抓取我們需要操作的畫面元素
    // 把「彈跳視窗外層」這個標籤存到 ageOverlay 變數中
    const ageOverlay = document.getElementById('age-verification');
    // 把「是的，我已滿 20 歲」這個按鈕存到 btnYes 變數中
    const btnYes = document.getElementById('btn-yes');
    // 把「未滿 20 歲，離開」這個按鈕存到 btnNo 變數中
    const btnNo = document.getElementById('btn-no');

    /* 
     * 步驟 2：檢查瀏覽器的短期記憶 (sessionStorage)
     * sessionStorage 會紀錄你在「這個分頁」留下的資料。
     * 一旦這個分頁被關閉，裡面的資料就會消失。
     * 
     * 這裡我們檢查瀏覽器裡有沒有 'ageVerified' 這個變數。
     */
    if (!sessionStorage.getItem('ageVerified')) {
        // 情況 A：如果沒有找到紀錄 (代表是第一次進來，或是重新開了一個新分頁)
        // 為了避免使用者視窗還沒點，就往下偷看網頁內容，
        // 我們把 body 的 overflow 設為 'hidden'，這樣畫面就無法上下捲動了。
        document.body.style.overflow = 'hidden';

        // 將原本預設隱藏的彈跳視窗顯示出來 (flex 可以保持它置中的排版設定)
        ageOverlay.style.display = 'flex';
        ageOverlay.style.alignItems = 'center';
        ageOverlay.style.justifyContent = 'center';
    } else {
        // 情況 B：如果有找到紀錄 (代表剛剛已經點過「是的」)
        // 因為 CSS 已經預設 display: none 了，所以這裡什麼都不用做，
        // 它自然就不會出現在畫面上，也不會閃一下。
    }

    /*
     * 步驟 3：設定「是的，我滿 20 歲」按鈕被點擊後的動作
     */
    btnYes.addEventListener('click', function () {
        // 1. 在瀏覽器的短期記憶 (sessionStorage) 中，新增一個叫做 'ageVerified'，值為 'true' 的紀錄。
        // 這樣下次重整網頁時，上面的「步驟 2」就會知道我們檢查過年紀了。
        sessionStorage.setItem('ageVerified', 'true');

        // 2. 讓視窗優雅地消失。先將透明度 (opacity) 設為 0
        // (配合 CSS 裡寫的 transition: opacity 0.4s ease; 會有漸漸變透明的動畫效果)
        ageOverlay.style.opacity = '0';

        // 3. 設定一個倒數計時器 (setTimeout)，等待 400 毫秒
        // (剛好等漸層消失的動畫跑完)
        setTimeout(() => {
            // 把整個視窗從畫面上徹底隱藏移走 (display = 'none')
            ageOverlay.style.display = 'none';
            // 恢復網頁原本的捲動功能，讓使用者可以正常看網站了！
            document.body.style.overflow = '';
        }, 400);
    });

    /*
     * 步驟 4：設定「未滿 20 歲」按鈕被點擊後的動作
     */
    btnNo.addEventListener('click', function () {
        // 1. 在畫面上跳出系統預設的警告小視窗，告知使用者無法瀏覽
        alert("你這個壞孩子😡，中原大學資工系歡迎你🤗");

        // 2. 強制變更當前瀏覽器的網址 (window.location.href)，
        // 把它踢到其他網站 (這裡以 Google 為例) 確保未成年人離開。
        window.location.href = "https://www.youtube.com/watch?v=Tw7sMMkV5LM";
    });
});
