// main.js - 다국어 지원 로직

// 1. 다국어 리소스 관리
const translations = {
    ko: {
        brand_name: "Where2Meet",
        hero_sub: "가장 친절한 모임의 시작",
        login_google: "Google 계정으로 시작하기",
        logout: "로그아웃",
        new_meeting: "➕ 새로운 모임 만들기",
        ongoing_meetings: "🚀 진행 중인 모임",
        meeting_policy: "모임 정책 설정",
        meeting_name_label: "모임 이름",
        date_range_label: "날짜 범위 선택",
        start_meeting_btn: "모임 시작하기",
        create_placeholder: "예: 연말 동기 모임",
        policy_settings: "정책 설정",
        vote_deadline: "투표 마감 및 시간",
        late_penalty: "지각 벌금",
        noshow_penalty: "노쇼(No-Show) 벌금",
        yield_point: "양보 포인트",
        multi_date: "날짜 다중 선택 가능"
    },
    en: {
        brand_name: "Where2Meet",
        hero_sub: "The Friendliest Way to Meet",
        login_google: "Continue with Google",
        logout: "Logout",
        new_meeting: "➕ Create New Meeting",
        ongoing_meetings: "🚀 Ongoing Meetings",
        meeting_policy: "Meeting Policy Settings",
        meeting_name_label: "Meeting Name",
        date_range_label: "Select Date Range",
        start_meeting_btn: "Start Meeting",
        create_placeholder: "e.g. Year-end Party",
        policy_settings: "Policy Settings",
        vote_deadline: "Vote Deadline & Time",
        late_penalty: "Late Penalty",
        noshow_penalty: "No-Show Penalty",
        yield_point: "Yield Points",
        multi_date: "Multiple Dates Selection"
    }
};

// 2. 초기 언어 설정 (localStorage 확인)
let currentLang = localStorage.getItem('w2m_lang') || 'ko';

// 3. 언어 업데이트 함수
function updateTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            // input placeholder인 경우 처리
            if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                el.placeholder = translations[currentLang][key];
            } else {
                el.innerText = translations[currentLang][key];
            }
        }
    });

    // 버튼 텍스트 업데이트 (현재 언어의 반대 표시)
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
        langBtn.innerText = currentLang === 'ko' ? 'EN' : 'KO';
    }
    
    // HTML lang 속성 업데이트
    document.documentElement.lang = currentLang;
}

// 4. 언어 토글 함수
function toggleLanguage() {
    currentLang = currentLang === 'ko' ? 'en' : 'ko';
    localStorage.setItem('w2m_lang', currentLang);
    updateTexts();
}

// 5. 기존 초기화 로직에 다국어 적용 통합
document.addEventListener('DOMContentLoaded', () => {
    updateTexts();
    // 기존에 인라인 스크립트로 작성된 초기화 함수들이 있다면 여기서 호출될 수 있도록 확인 필요
});
