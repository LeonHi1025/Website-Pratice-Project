
// 點擊卡片跳轉與波紋效果
function initCardEvents() {
    {
        const cards = document.querySelectorAll('.member-card');
        cards.forEach(card => {
            {
                card.addEventListener('click', function (event) {
                    {
                        // 如果點到的是社群按鈕，就不要觸發跳轉 (避免衝突)
                        if (event.target.closest('.social-btn')) {
                            {
                                return;
                            }
                        }

                        // 取得預設的跳轉連結
                        const url = this.getAttribute('data-url');
                        if (!url) return;

                        const name = this.querySelector('.member-name') ? this.querySelector('.member-name').innerText : '';

                        // 產生酷炫的點擊波紋效果 (Ripple Effect)
                        const ripple = document.createElement('div');
                        ripple.style.position = 'absolute';
                        ripple.style.width = '20px';
                        ripple.style.height = '20px';
                        ripple.style.background = 'rgba(255, 255, 255, 0.4)';
                        ripple.style.borderRadius = '50%';
                        ripple.style.transform = 'translate(-50%, -50%)';
                        ripple.style.pointerEvents = 'none';
                        ripple.style.animation = 'ripple-effect 0.6s linear';

                        // 計算點擊位置
                        const rect = this.getBoundingClientRect();
                        ripple.style.left = (event.clientX - rect.left) + 'px';
                        ripple.style.top = (event.clientY - rect.top) + 'px';

                        this.appendChild(ripple);

                        // 加上稍微延遲的跳轉效果，讓使用者看得見波紋動畫
                        setTimeout(() => {
                            {
                                ripple.remove();
                                window.location.href = url;
                            }
                        }, 300); // 延遲 300 毫秒跳轉去專屬頁面
                    }
                });
            }
        });
    }
}

// 標題打字機動畫
function initTypewriter() {
    {
        const tagline = document.querySelector('.tagline');
        if (!tagline) return;

        const originalText = tagline.innerText;
        tagline.innerText = '';

        let i = 0;
        function typeWriter() {
            {
                if (i < originalText.length) {
                    {
                        tagline.innerText += originalText.charAt(i);
                        i++;
                        setTimeout(typeWriter, 100);
                    }
                }
            }
        }
        setTimeout(typeWriter, 500);
    }
}

// 當所有 HTML 標籤載入完畢後，執行我們的所有 JS 功能
document.addEventListener('DOMContentLoaded', function () {
    {
        // 依序執行功能
        initTypewriter();         // 1. 標題打字機
        initCardEvents();         // 2. 卡片點擊波紋與跳轉事件
    }
});
