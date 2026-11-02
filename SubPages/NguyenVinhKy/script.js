// 1. Khởi tạo Icons
lucide.createIcons();

// 2. Khởi tạo AOS
AOS.init({ duration: 800, once: true, offset: 100 });

// 3. Khai báo chuỗi hiển thị cho hiệu ứng gõ chữ
const typedStrings = {
    vi: ['Sinh viên Kỹ thuật Phần mềm', 'Người đam mê lập trình', 'Nhà phát triển tương lai'],
    en: ['Software Engineering Student', 'Programming Enthusiast', 'Aspiring Developer']
};
let typedInstance = null;

function initTyped(lang) {
    if (typedInstance) typedInstance.destroy();
    typedInstance = new Typed('#typed', {
        strings: typedStrings[lang],
        typeSpeed: 50, backSpeed: 30, backDelay: 2000, loop: true, cursorChar: '_'
    });
}

document.addEventListener('DOMContentLoaded', () => initTyped('vi'));

// 4. Navbar Scroll & Active Links
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) link.classList.add('active');
    });
});

// 5. Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
navLinks.forEach(link => link.addEventListener('click', () => navMenu.classList.remove('active')));

// 6. Copy Email
const copyBtn = document.getElementById('copy-btn');
const emailText = document.getElementById('email-text').innerText;
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailText).then(() => {
        const originalIcon = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i data-lucide="check" style="color: #00bfff;"></i>';
        lucide.createIcons();
        setTimeout(() => { copyBtn.innerHTML = originalIcon; lucide.createIcons(); }, 2000);
    });
});

// 7. Scroll to Top
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) scrollTopBtn.classList.add("show");
    else scrollTopBtn.classList.remove("show");
});
scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// 8. Form Validation
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    formGroup.querySelector('.error-msg').innerText = message;
}
function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    formGroup.querySelector('.error-msg').innerText = '';
}
function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase());
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    const isEn = currentLang === 'en';
    
    if (nameInput.value.trim() === '') { 
        showError(nameInput, isEn ? 'Please enter your name' : 'Vui lòng nhập họ tên'); 
        isValid = false; 
    } else showSuccess(nameInput);
    
    if (emailInput.value.trim() === '') { 
        showError(emailInput, isEn ? 'Please enter your email' : 'Vui lòng nhập email'); 
        isValid = false; 
    } else if (!checkEmail(emailInput.value.trim())) { 
        showError(emailInput, isEn ? 'Invalid email format' : 'Email sai định dạng'); 
        isValid = false; 
    } else showSuccess(emailInput);
    
    if (messageInput.value.trim() === '') { 
        showError(messageInput, isEn ? 'Please enter your message' : 'Vui lòng nhập tin nhắn'); 
        isValid = false; 
    } else showSuccess(messageInput);
    
    if (isValid) {
        alert(isEn ? 'Message sent successfully!' : 'Gửi tin nhắn thành công!');
        form.reset();
    }
});

// 9. Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    document.getElementById('scroll-progress').style.width = (scrollTop / scrollHeight) * 100 + '%';
});

// ==========================================
// 10. TỪ ĐIỂN ĐA NGÔN NGỮ ĐẦY ĐỦ (FULL I18N)
// ==========================================
const translations = {
    vi: {
        // Navigation
        nav_home: "Trang chủ", nav_about: "Giới thiệu", nav_skills: "Kỹ năng", nav_projects: "Dự án", nav_goals: "Mục tiêu", nav_contact: "Liên hệ",
        
        // Hero
        hero_greeting: "Xin chào, tôi là", hero_iam: "Một", hero_motto: '"Học hôm nay, xây dựng ngày mai."',
        btn_projects: "Xem Dự Án", btn_contact: "Liên Hệ",
        
        // About & Education
        title_about: "Về Tôi",
        about_p1: "Tôi là sinh viên năm 2 chuyên ngành Kỹ thuật Phần mềm tại Đại học Bình Dương. Tôi có niềm đam mê lớn với lập trình, phát triển web và luôn khát khao khám phá những công nghệ mới.",
        about_p2: "Tôi liên tục trau dồi kiến thức kỹ thuật thông qua các dự án học thuật và thực hành thực tế. Tôi thích giải quyết vấn đề, học hỏi các khái niệm mới và phát triển những ứng dụng có tính thực tiễn cao.",
        about_p3: "Mục tiêu hiện tại của tôi là củng cố kỹ năng lập trình, tích lũy kinh nghiệm thực tế và từng bước trở thành một Software Developer chuyên nghiệp.",
        title_edu: "Học Vấn",
        edu_school: "Đại học Bình Dương", edu_major: "Chuyên ngành: Kỹ thuật Phần mềm", edu_year: "Sinh viên năm 2",
        
        // Skills & Languages
        title_skills: "Kỹ năng & Ngôn ngữ",
        cat_dev: "Lập trình & Web", cat_core: "Kiến thức Cốt lõi", cat_tools: "Công cụ Phát triển", cat_lang: "Ngoại ngữ",
        skill_dsa: "Cấu trúc Dữ liệu & Giải thuật (DSA)", skill_db: "Quản trị CSDL Cơ bản",
        lang_en: "Tiếng Anh", lang_cn: "Tiếng Trung",
        
        // Projects
        title_projects: "Dự án Nổi bật",
        p1_title: "Hệ thống Quản lý Sinh viên", p1_desc: "Ứng dụng quản lý sinh viên hỗ trợ các chức năng thêm, tìm kiếm, hiển thị và sắp xếp thông tin sinh viên một cách trực quan.",
        p2_title: "Hệ thống Quản lý Khách sạn", p2_desc: "Ứng dụng quản lý khách sạn xử lý thông tin phòng, đặt phòng, dữ liệu khách hàng, quy trình trả phòng và xuất hóa đơn.",
        p3_title: "Personal Portfolio Website", p3_desc: "Website portfolio cá nhân hiển thị hồ sơ, học vấn, kỹ năng, dự án và thông tin liên hệ với giao diện dark theme hiện đại.",
        
        // Goals
        title_goals: "Mục tiêu Nghề nghiệp", goal_short: "Mục tiêu Ngắn hạn", goal_long: "Mục tiêu Dài hạn",
        sg1: "Cải thiện kỹ năng lập trình Python và C++.",
        sg2: "Nắm vững nền tảng về OOP và cấu trúc dữ liệu giải thuật (DSA).",
        sg3: "Phát triển thêm nhiều dự án thực tế về Web Development.",
        sg4: "Nâng cao kỹ năng giao tiếp bằng Tiếng Anh và Tiếng Trung.",
        lg1: "Trở thành một Software Developer chuyên nghiệp.",
        lg2: "Tích lũy kinh nghiệm phát triển phần mềm trong môi trường thực tế.",
        lg3: "Xây dựng các ứng dụng hữu ích và mang lại giá trị cho người dùng.",
        lg4: "Không ngừng khám phá và cập nhật các công nghệ mới.",
        
        // Contact & Form
        title_contact: "Liên Hệ", contact_title: "Hãy kết nối với tôi!",
        contact_desc: "Tôi luôn cởi mở với các cơ hội mới và những cuộc trò chuyện về công nghệ.",
        form_title: "Gửi tin nhắn", btn_send: "Gửi Tin Nhắn",
        ph_name: "Họ và tên của bạn", ph_email: "Email của bạn", ph_msg: "Nội dung tin nhắn..."
    },
    en: {
        // Navigation
        nav_home: "Home", nav_about: "About", nav_skills: "Skills", nav_projects: "Projects", nav_goals: "Goals", nav_contact: "Contact",
        
        // Hero
        hero_greeting: "Hello, I am", hero_iam: "A", hero_motto: '"Learning today, building tomorrow."',
        btn_projects: "View Projects", btn_contact: "Contact Me",
        
        // About & Education
        title_about: "About Me",
        about_p1: "I am a second-year Software Engineering student at Binh Duong University. I am passionate about programming, web development, and exploring new technologies.",
        about_p2: "I continuously improve my technical knowledge through academic projects and hands-on practice. I enjoy solving problems, learning new concepts, and developing practical applications.",
        about_p3: "My current goal is to strengthen my programming skills, gain practical experience, and gradually become a professional Software Developer.",
        title_edu: "Education",
        edu_school: "Binh Duong University", edu_major: "Major: Software Engineering", edu_year: "Second-year student",
        
        // Skills & Languages
        title_skills: "Skills & Languages",
        cat_dev: "Programming & Web", cat_core: "Core Knowledge", cat_tools: "Development Tools", cat_lang: "Languages",
        skill_dsa: "Data Structures & Algorithms (DSA)", skill_db: "Basic Database Management",
        lang_en: "English", lang_cn: "Chinese",
        
        // Projects
        title_projects: "Featured Projects",
        p1_title: "Student Management System", p1_desc: "A student management application supporting adding, searching, displaying, and sorting student information.",
        p2_title: "Hotel Management System", p2_desc: "A hotel management application handling room info, reservations, customer data, checkout, and invoices.",
        p3_title: "Personal Portfolio Website", p3_desc: "A personal portfolio website showcasing profile, education, technical skills, projects, and contact information.",
        
        // Goals
        title_goals: "Career Goals", goal_short: "Short-term Goals", goal_long: "Long-term Goals",
        sg1: "Improve Python and C++ programming skills.",
        sg2: "Strengthen understanding of OOP and Data Structures & Algorithms.",
        sg3: "Develop more practical web development projects.",
        sg4: "Improve English and Chinese communication skills.",
        lg1: "Become a professional Software Developer.",
        lg2: "Gain real-world software development experience.",
        lg3: "Build useful and meaningful applications.",
        lg4: "Continuously explore new technologies.",
        
        // Contact & Form
        title_contact: "Contact Me", contact_title: "Let's Connect!",
        contact_desc: "I am always open to new opportunities and discussions about technology.",
        form_title: "Send a Message", btn_send: "Send Message",
        ph_name: "Your Full Name", ph_email: "Your Email Address", ph_msg: "Your Message..."
    }
};

let currentLang = 'vi';
const langToggleBtn = document.getElementById('langToggle');

langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';
    langToggleBtn.innerText = currentLang === 'vi' ? 'EN' : 'VI';
    
    // Thay đổi ngôn ngữ các đoạn văn bản
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerText = translations[currentLang][key];
        }
    });

    // Thay đổi placeholder của Form
    nameInput.placeholder = translations[currentLang].ph_name;
    emailInput.placeholder = translations[currentLang].ph_email;
    messageInput.placeholder = translations[currentLang].ph_msg;

    // Khởi tạo lại hiệu ứng gõ chữ tiếng Anh/Việt
    initTyped(currentLang);
});