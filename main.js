// main.js - 다국어 지원 로직 및 제휴 폼 처리

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
        multi_date: "날짜 다중 선택 가능",
        // 제휴 관련
        partner_badge: "사장님 전용",
        partner_title: "이 근처 식당을 운영하시나요?",
        partner_desc: "Where2Meet 멤버들에게 우리 가게를 홍보하고 특별한 혜택을 제공해 보세요!",
        partner_stats: "🔥 이번 달 824개의 모임 성사!",
        partner_btn: "제휴 문의하기",
        inquiry_title: "간편 제휴 신청",
        label_store_name: "가게명",
        label_region: "지역",
        label_contact: "연락처",
        label_email: "이메일 주소",
        ph_store_name: "가게 이름을 입력하세요",
        ph_region: "예: 서울 강남구",
        ph_contact: "010-0000-0000",
        ph_email: "example@mail.com",
        submit_inquiry: "문의 등록하기",
        cancel: "취소",
        inquiry_success: "제휴 문의가 접수되었습니다. 곧 연락드릴게요!",
        inquiry_error: "오류가 발생했습니다. 다시 시도해 주세요."
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
        multi_date: "Multiple Dates Selection",
        // Partner related
        partner_badge: "FOR OWNERS",
        partner_title: "Do you run a restaurant nearby?",
        partner_desc: "Promote your place to Where2Meet members and offer special benefits!",
        partner_stats: "🔥 824 meetups organized this month!",
        partner_btn: "Partner Inquiry",
        inquiry_title: "Simple Partnership Inquiry",
        label_store_name: "Store Name",
        label_region: "Region",
        label_contact: "Contact",
        label_email: "E-mail Address",
        ph_store_name: "Enter your store name",
        ph_region: "e.g. Gangnam, Seoul",
        ph_contact: "Your phone number",
        ph_email: "example@mail.com",
        submit_inquiry: "Submit Inquiry",
        cancel: "Cancel",
        inquiry_success: "Your inquiry has been received. We'll contact you soon!",
        inquiry_error: "An error occurred. Please try again."
    }
};

// 2. 초기 언어 설정 (localStorage 확인)
let currentLang = localStorage.getItem('w2m_lang') || 'ko';

// 3. 언어 업데이트 함수
function updateTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                el.placeholder = translations[currentLang][key];
            } else {
                el.innerText = translations[currentLang][key];
            }
        }
    });

    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
        langBtn.innerText = currentLang === 'ko' ? 'EN' : 'KO';
    }
    
    document.documentElement.lang = currentLang;
}

// 4. 언어 토글 함수
function toggleLanguage() {
    currentLang = currentLang === 'ko' ? 'en' : 'ko';
    localStorage.setItem('w2m_lang', currentLang);
    updateTexts();
}

// 5. 제휴 폼 토글 및 제출 처리
function togglePartnerForm() {
    const form = document.getElementById('partnerFormContainer');
    if (!form) return;
    const isShowing = form.style.display !== 'none';
    form.style.display = isShowing ? 'none' : 'block';
    if (!isShowing) form.scrollIntoView({ behavior: 'smooth' });
}

// 6. 초기화 로직
document.addEventListener('DOMContentLoaded', () => {
    updateTexts();
    
    const partnerForm = document.getElementById('partnerForm');
    if (partnerForm) {
        partnerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(partnerForm);
            try {
                const response = await fetch(partnerForm.action, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    showToast(translations[currentLang].inquiry_success);
                    partnerForm.reset();
                    togglePartnerForm();
                } else {
                    showToast(translations[currentLang].inquiry_error);
                }
            } catch (error) {
                showToast(translations[currentLang].inquiry_error);
            }
        });
    }
});
