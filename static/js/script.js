// 기존 JavaScript 코드에 애니메이션 효과 추가

function addMessageToChat(role, message) {
    const chatContainer = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;
    messageDiv.textContent = message;
    
    // 메시지가 나타날 때 페이드인 효과
    messageDiv.style.opacity = '0';
    chatContainer.appendChild(messageDiv);
    
    // 부드러운 스크롤 효과
    chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth'
    });
    
    // 페이드인 애니메이션
    setTimeout(() => {
        messageDiv.style.opacity = '1';
    }, 10);
}

function generateQuote() {
    const quoteElement = document.getElementById('generatedQuote');
    const quotes = [
        "내 인생은 버그 없는 코드처럼 완벽하지 않아도 돼 ✨",
        "가끔은 커피처럼 쓴 현실도 필요해 ☕",
        "인생은 마치 JavaScript처럼 예측불가능해 🎲",
        "버그를 찾듯이 삶의 해답을 찾아가는 중 🔍"
    ];
    
    // 페이드 아웃 효과
    quoteElement.style.opacity = '0';
    
    setTimeout(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteElement.textContent = randomQuote;
        // 페이드 인 효과
        quoteElement.style.opacity = '1';
    }, 300);
}

// 로딩 인디케이터 추가
function showLoading(button) {
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = '처리중...';
    return originalText;
}

function hideLoading(button, originalText) {
    button.disabled = false;
    button.textContent = originalText;
}

// 버튼 클릭 효과 개선
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (!message) return;

    // 사용자 메시지 추가
    addMessageToChat('user', message);
    userInput.value = '';

    try {
        // 로딩 표시
        const sendButton = document.querySelector('.send-button');
        const originalContent = sendButton.innerHTML;
        sendButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        sendButton.disabled = true;

        // API 호출
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });

        if (!response.ok) {
            throw new Error('API 요청 실패');
        }

        const data = await response.json();
        
        // AI 응답 메시지 추가
        addMessageToChat('ai', data.response);

        // 버튼 상태 복구
        sendButton.innerHTML = originalContent;
        sendButton.disabled = false;

    } catch (error) {
        console.error('Error:', error);
        addMessageToChat('ai', '죄송합니다. 오류가 발생했습니다.');
    }
}

// Enter 키 이벤트 처리
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// 명언 생성 기능
async function generateQuote() {
    const quoteElement = document.getElementById('generatedQuote');
    const button = document.querySelector('.generate-button');
    
    try {
        // 로딩 표시
        const originalContent = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 생성 중...';
        button.disabled = true;

        // 현재 채팅 내용을 기반으로 명언 생성
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: "지금까지 대화를 기반으로 멋진 명언을 만들어줘!" })
        });

        if (!response.ok) {
            throw new Error('명언 생성 실패');
        }

        const data = await response.json();
        quoteElement.textContent = data.response;

        // 버튼 상태 복구
        button.innerHTML = originalContent;
        button.disabled = false;

    } catch (error) {
        console.error('Error:', error);
        quoteElement.textContent = '명언 생성에 실패했습니다.';
        button.disabled = false;
    }
}

// 인스타그램 공유 기능
function shareToInstagram() {
    const quote = document.getElementById('generatedQuote').textContent;
    // 인스타그램 공유 로직 구현
    alert('인스타그램 공유 기능은 준비 중입니다!');
}