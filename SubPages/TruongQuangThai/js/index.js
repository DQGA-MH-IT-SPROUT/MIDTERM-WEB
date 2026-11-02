const navigationEntry = performance.getEntriesByType("navigation")[0];
if (navigationEntry?.type === "reload") {
    const scrollRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    window.addEventListener("pageshow", () => {
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, 0);
        document.documentElement.style.removeProperty("scroll-behavior");
        history.scrollRestoration = scrollRestoration;
    }, { once: true });
}

const translations = {
            vi: {
                metaDescription: "Trang giới thiệu Trương Quang Thái, sinh viên năm 2 khóa 25 học tại Trường Đại học Bình Dương.",
                skipLink: "Đi đến nội dung chính", mainNavigation: "Điều hướng chính", openMenu: "Mở menu",
                navAbout: "Giới thiệu", navEducation: "Học vấn", navSkills: "Kỹ năng", navWork: "Dự án", navContact: "Liên hệ", navChallenge: "Thử thách",
                toggleTheme: "Chuyển sang giao diện tối", toggleThemeLight: "Chuyển sang giao diện sáng", themeDark: "Tối", themeLight: "Sáng", toggleLanguage: "Switch to English",
                studentStatus: "Sinh viên năm 2 · Khóa 25", heroTitle: "Xin chào,<br>em là <span>Thái.</span>",
                heroLead: "Đây là web của thiết kế — nơi ghi lại hành trình học Công nghệ thông tin, những điều đang khám phá và sản phẩm em tự tay thực hiện.",
                aboutMe: "Đôi nét về mình", tagCurious: "✦ Ham học hỏi", tagTech: "⌘ Thích công nghệ", tagExplore: "↗ Luôn thử điều mới",
                heroAboutButton: "Khám phá câu chuyện", heroWorkButton: "Xem dự án", flipToBack: "Lật thẻ để xem sở thích mẫu", flipToFront: "Lật thẻ về mặt ảnh đại diện",
                flipToInterests: "Nhấn hoặc chạm để xem mặt sau", backKicker: "THÁI Ở PHIÊN BẢN ĐỜI THƯỜNG", backTitle: "Một chút về", backTitleAccent: "con người mình",
                traitsTitle: "TÍNH CÁCH", traitsCount: "6 nét riêng", traitFriendly: "Thân thiện", traitHonest: "Trung thực", traitCareful: "Kỹ lưỡng", traitEmpathetic: "Thấu hiểu", traitCalm: "Bình tĩnh", traitPatient: "Điềm đạm, không dễ nóng giận",
                interestsTitle: "LÚC RẢNH MÌNH THÍCH", interestLearning: "Học hỏi", interestChallenge: "Thử thách", interestQuiet: "Yên tĩnh", interestMusic: "Âm nhạc", interestSports: "Thể thao", interestAudio: "Audio",
                learningMotto: "HỌC · HỎI · HIỂU · HÀNH", flipBack: "Lật lại", stickerMotto: "HỌC · HỎI · HIỂU · HÀNH",
                basicInfo: "Thông tin cơ bản", schoolLabel: "Trường", schoolName: "Trường Đại học Bình Dương", majorLabel: "Ngành", majorName: "Công nghệ thông tin",
                classLabel: "Lớp", nameLabel: "Họ và tên", studentIdLabel: "Mã số sinh viên", emailLabel: "Email", courseLabel: "Khóa học",
                aspirationLabel: "Định hướng", aspirationValue: "Làm một người tốt",
                marqueeLabel: "Thông điệp: Học hỏi mỗi ngày, sáng tạo theo cách riêng", marqueeLearn: "HỌC HỎI MỖI NGÀY", marqueeCreate: "SÁNG TẠO THEO CÁCH RIÊNG",
                aboutLabel: "Giới thiệu", aboutKicker: "MỘT CHÚT VỀ MÌNH", aboutTitle: "Đang lớn từng ngày học tập.",
                aboutParagraph1: "Em là Trương Quang Thái, sinh viên Trường Đại học Bình Dương. Em mong muốn đạt điểm tốt môn Thiết kế Web và luôn cố gắng học thêm điều mới qua từng bài tập.",
                aboutParagraph2: "Em từng làm đội trưởng nhóm học tập và tham gia chiến dịch Mùa hè xanh tại xã An Long năm 2026. Trong thời gian tới, em muốn tiếp tục xây nền tảng vững chắc, thực hành nhiều hơn và tạo ra những sản phẩm tốt hơn.",
                careerGoalTitle: "Mục tiêu nghề nghiệp", careerGoalCopy: "Trước mắt, em muốn củng cố nền tảng lập trình, cơ sở dữ liệu và phát triển web qua các sản phẩm thực tế. Về lâu dài, em định hướng phát triển sự nghiệp trong lĩnh vực Công nghệ thông tin.",
                guidingPrinciple: "KIM CHỈ NAM", learningMethod: "Phương pháp của em", learn: "Học", ask: "Hỏi", understand: "Hiểu", practice: "Hành",
                learningMethodCopy: "Học thì phải hỏi thì hiểu và hãy hành động.",
                educationLabel: "Học vấn & hoạt động", educationTitle: "Hành trình học tập.", educationIntro: "Một vài thông tin về quá trình học tập và hoạt động của mình.", currentStatus: "HIỆN TẠI",
                activityLabel: "HOẠT ĐỘNG", greenSummerTitle: "Chiến dịch Mùa hè xanh 2026", greenSummerDescription: "Tham gia chiến dịch Mùa hè xanh tại xã An Long.",
                achievementsLabel: "Thành tích",
                achievementTabsAria: "Danh mục thành tích", commendationsTab: "Giấy khen", certificatesTab: "Chứng chỉ",
                achievementImageDialog: "Xem ảnh thành tích", closeAchievementImage: "Đóng ảnh",
                skillsLabel: "Kỹ năng", skillsTitle: "Những điều mình đang rèn luyện.", skillsIntro: "Các kỹ năng dưới đây phản ánh quá trình học tập và thực hành hiện tại.",
                skillC: "C cơ bản", paused: "Tạm hoãn", learning: "Đang học", practicing: "Đang thực hành", skillDatabase: "Cơ sở dữ liệu", skillNetworking: "Mạng cơ bản",
                workLabel: "Dự án", workTitle: "Những điều mình đang thực hiện.", workIntro: "Một số sản phẩm học tập và dự án cá nhân trong quá trình tìm hiểu, thực hành.",
                htmlAlt: "Biểu tượng HTML5", databaseAlt: "Máy tính dùng cho dự án cơ sở dữ liệu mua bán", athleteAlt: "Hình minh họa vận động viên",
                personalProject: "DỰ ÁN CÁ NHÂN", groupProject: "DỰ ÁN NHÓM", portfolioProject: "Website giới thiệu cá nhân",
                portfolioDescription: "Trang responsive giới thiệu hồ sơ, kỹ năng và cách liên hệ.", technologyLabel: "Công nghệ:", portfolioLink: "Mở website", databaseTech: "Cơ sở dữ liệu · bài tập môn học",
                databaseProject: "Quản lý cơ sở dữ liệu mua bán máy tính", databaseDescription: "Bài tập nhóm xây dựng cơ sở dữ liệu cho hoạt động mua bán máy tính.", databaseViewProject: "Nhấn để xem dự án",
                athleteProject: "Quản lý vận động viên (OOP)", athleteDescription: "Bài tập cá nhân xây dựng ứng dụng quản lý vận động viên sử dụng lập trình hướng đối tượng.",
                challengeLabel: "MINI GAME · CARO", challengeTitle: "Caro — Đấu với bot.",
                challengeIntro: "Nối 5 quân liên tiếp trước bot để giành chiến thắng. Bạn cầm X, bot cầm O.",
                minigameTitle: "Caro — Đấu với bot",
                contactTitle: "Liên hệ", contactMessage: "Để lại lời nhắn",
                contactChatOpen: "Mở biểu mẫu liên hệ", contactChatClose: "Đóng biểu mẫu liên hệ",
                contactChatTitle: "Gửi lời nhắn", contactChatIntro: "Điền thông tin bên dưới, ứng dụng email sẽ mở để bạn gửi lời nhắn.",
                contactNameLabel: "Họ và tên", contactEmailLabel: "Email của bạn", contactMessageLabel: "Nội dung",
                contactSend: "Gửi lời nhắn", contactNameError: "Vui lòng nhập họ tên từ 2 đến 80 ký tự.",
                contactEmailError: "Vui lòng nhập địa chỉ email hợp lệ.",
                contactMessageError: "Nội dung cần có từ 10 đến 2000 ký tự.",
                contactFormSending: "Đang mở ứng dụng email để gửi lời nhắn...",
                copyright: "© 2026 Trương Quang Thái · Trang giới thiệu cá nhân", readingProgress: "Tiến độ đọc trang",
                backToTop: "Về đầu trang"
            },
            en: {
                metaDescription: "Meet Truong Quang Thai, a second-year Information Technology student at Binh Duong University.",
                skipLink: "Skip to main content", mainNavigation: "Main navigation", openMenu: "Open menu",
                navAbout: "About", navEducation: "Education", navSkills: "Skills", navWork: "Projects", navContact: "Contact", navChallenge: "Challenge",
                toggleTheme: "Switch to dark mode", toggleThemeLight: "Switch to light mode", themeDark: "Dark", themeLight: "Light", toggleLanguage: "Chuyển sang Tiếng Việt",
                studentStatus: "Second-year student · Cohort 25", heroTitle: "Hello,<br>I'm <span>Thai.</span>",
                heroLead: "This is my little corner of the internet — a place to share my IT learning journey, the things I'm exploring, and projects I've built myself.",
                aboutMe: "A little about me", tagCurious: "✦ Curious learner", tagTech: "⌘ Into technology", tagExplore: "↗ Always exploring",
                heroAboutButton: "Discover my story", heroWorkButton: "Explore projects", flipToBack: "Flip the card to see my interests", flipToFront: "Flip the card back to my photo",
                flipToInterests: "Tap or click to see the back", backKicker: "A LITTLE LOOK AT THE REAL ME", backTitle: "A little about", backTitleAccent: "who I am",
                traitsTitle: "MY PERSONALITY", traitsCount: "6 little traits", traitFriendly: "Friendly", traitHonest: "Honest", traitCareful: "Detail-minded", traitEmpathetic: "Empathetic", traitCalm: "Calm", traitPatient: "Patient and even-tempered",
                interestsTitle: "IN MY FREE TIME", interestLearning: "Learning", interestChallenge: "Challenges", interestQuiet: "Quiet time", interestMusic: "Music", interestSports: "Sports", interestAudio: "Podcasts",
                learningMotto: "LEARN · ASK · UNDERSTAND · DO", flipBack: "Flip back", stickerMotto: "LEARN · ASK · UNDERSTAND · DO",
                basicInfo: "Basic information", schoolLabel: "University", schoolName: "Binh Duong University", majorLabel: "Major", majorName: "Information Technology",
                classLabel: "Class", nameLabel: "Name", studentIdLabel: "Student ID", emailLabel: "Email", courseLabel: "Cohort",
                aspirationLabel: "Aspiration", aspirationValue: "Be a good person",
                marqueeLabel: "Message: Learn every day, create in your own way", marqueeLearn: "LEARN SOMETHING EVERY DAY", marqueeCreate: "CREATE IN YOUR OWN WAY",
                aboutLabel: "About", aboutKicker: "A LITTLE ABOUT ME", aboutTitle: "Growing one line of code at a time.",
                aboutParagraph1: "I'm Truong Quang Thai, a student at Binh Duong University. I hope to do well in Web Design and keep learning something new with every assignment.",
                aboutParagraph2: "I have been a study group leader and joined the 2026 Green Summer campaign in An Long. I hope to keep building a strong foundation, practice more, and create better projects.",
                careerGoalTitle: "Career goal", careerGoalCopy: "In the near term, I want to strengthen my programming, database, and web development foundations through practical projects. Long term, I aim to build a career in Information Technology.",
                guidingPrinciple: "MY GUIDING PRINCIPLE", learningMethod: "How I learn", learn: "Learn", ask: "Ask", understand: "Understand", practice: "Practice",
                learningMethodCopy: "Every small project is a chance to understand more and take another step forward.",
                educationLabel: "Education & activities", educationTitle: "My learning journey.", educationIntro: "A quick look at my studies and activities.", currentStatus: "CURRENT",
                activityLabel: "ACTIVITY", greenSummerTitle: "Green Summer 2026 campaign", greenSummerDescription: "Joined the Green Summer campaign in An Long commune.",
                achievementsLabel: "Achievements",
                achievementTabsAria: "Achievement categories", commendationsTab: "Awards", certificatesTab: "Certificates",
                achievementImageDialog: "View achievement image", closeAchievementImage: "Close image",
                skillsLabel: "Skills", skillsTitle: "Things I'm learning.", skillsIntro: "These skills reflect what I'm currently studying and practicing.",
                skillC: "C fundamentals", paused: "On hold", learning: "Learning", practicing: "Practicing", skillDatabase: "Databases", skillNetworking: "Networking basics",
                workLabel: "Projects", workTitle: "Things I'm working on.", workIntro: "A few school assignments and personal projects from my learning journey.",
                htmlAlt: "HTML5 logo", databaseAlt: "Computer for the computer sales database project", athleteAlt: "Athlete illustration",
                personalProject: "PERSONAL PROJECT", groupProject: "GROUP PROJECT", portfolioProject: "Personal portfolio website",
                portfolioDescription: "A responsive site introducing my profile, skills, and contact information.", technologyLabel: "Technology:", portfolioLink: "View website", databaseTech: "Database coursework",
                databaseProject: "Computer Sales Database Management", databaseDescription: "A group project building a database for computer sales.", databaseViewProject: "Click to view project",
                athleteProject: "Athlete Management (OOP)", athleteDescription: "A personal project building an athlete management app with object-oriented programming.",
                challengeLabel: "MINI GAME · GOMOKU", challengeTitle: "Gomoku — Play the bot.",
                challengeIntro: "Connect five in a row before the bot does. You're X and the bot is O.",
                minigameTitle: "Gomoku — Play the bot",
                contactTitle: "Contact", contactMessage: "Send me a message",
                contactChatOpen: "Open contact form", contactChatClose: "Close contact form",
                contactChatTitle: "Send a message", contactChatIntro: "Fill in the form and your email app will open with the message ready to send.",
                contactNameLabel: "Full name", contactEmailLabel: "Your email", contactMessageLabel: "Message",
                contactSend: "Send message", contactNameError: "Enter a name between 2 and 80 characters.",
                contactEmailError: "Enter a valid email address.",
                contactMessageError: "The message must be between 10 and 2000 characters.",
                contactFormSending: "Opening your email app...",
                copyright: "© 2026 Truong Quang Thai · Personal portfolio", readingProgress: "Page reading progress",
                backToTop: "Back to top"
            }
        };

        const preferenceKeys = { theme: "tqt-theme", language: "tqt-language" };
        function readPreference(key, fallback) {
            try {
                return localStorage.getItem(key) || fallback;
            } catch (error) {
                console.error(`Could not read ${key} preference:`, error);
                return fallback;
            }
        }
        function savePreference(key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (error) {
                console.error(`Could not save ${key} preference:`, error);
            }
        }

        let currentLanguage = readPreference(preferenceKeys.language, "vi") === "en" ? "en" : "vi";
        function applyLanguage(language) {
            currentLanguage = language === "en" ? "en" : "vi";
            const strings = translations[currentLanguage];
            document.documentElement.lang = currentLanguage;
            document.title = currentLanguage === "en" ? "Truong Quang Thai — Portfolio" : "Trương Quang Thái — Giới thiệu";
            document.querySelectorAll("[data-i18n]").forEach((element) => {
                const value = strings[element.dataset.i18n];
                if (value !== undefined) element.textContent = value;
            });
            document.querySelectorAll("[data-i18n-html]").forEach((element) => {
                const value = strings[element.dataset.i18nHtml];
                if (value !== undefined) element.innerHTML = value;
            });
            document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
                const value = strings[element.dataset.i18nAriaLabel];
                if (value !== undefined) element.setAttribute("aria-label", value);
            });
            document.querySelectorAll("[data-i18n-title]").forEach((element) => {
                const value = strings[element.dataset.i18nTitle];
                if (value !== undefined) element.title = value;
            });
            document.querySelectorAll("[data-i18n-content]").forEach((element) => {
                const value = strings[element.dataset.i18nContent];
                if (value !== undefined) element.content = value;
            });
            document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
                const value = strings[element.dataset.i18nAlt];
                if (value !== undefined) element.alt = value;
            });
            document.querySelector("#language-label").textContent = currentLanguage.toUpperCase();
            const contactChatToggle = document.querySelector("#contact-chat-toggle");
            const contactChatPanel = document.querySelector("#contact-chat-panel");
            if (contactChatToggle && contactChatPanel) {
                contactChatToggle.setAttribute(
                    "aria-label",
                    strings[contactChatPanel.hidden ? "contactChatOpen" : "contactChatClose"]
                );
            }
            const contactFormStatus = document.querySelector("#contact-form-status");
            if (contactFormStatus) contactFormStatus.textContent = "";
            const flipped = document.querySelector(".flip-card").getAttribute("aria-pressed") === "true";
            document.querySelector(".flip-card").setAttribute("aria-label", strings[flipped ? "flipToFront" : "flipToBack"]);
            updateThemeControlLabel();
            syncMiniGamePreferences();
        }

        function updateThemeControlLabel() {
            const isDark = document.documentElement.dataset.theme === "dark";
            const strings = translations[currentLanguage];
            document.querySelector(".theme-icon").textContent = isDark ? "☾" : "☀";
            document.querySelector(".control-label").textContent = strings[isDark ? "themeDark" : "themeLight"];
            document.querySelector(".theme-toggle").setAttribute("aria-label", strings[isDark ? "toggleThemeLight" : "toggleTheme"]);
        }

        function applyTheme(theme) {
            const selectedTheme = theme === "dark" ? "dark" : "light";
            document.documentElement.dataset.theme = selectedTheme;
            updateThemeControlLabel();
            document.querySelector('meta[name="theme-color"]').content = selectedTheme === "dark" ? "#171b25" : "#faf8f2";
            syncMiniGamePreferences();
        }

        function syncMiniGamePreferences() {
            document.querySelector("#challenge-frame")?.contentWindow?.postMessage({
                type: "mini-game-preferences",
                language: currentLanguage,
                theme: document.documentElement.dataset.theme === "dark" ? "dark" : "light"
            }, "*");
        }

        document.querySelector("#theme-toggle").addEventListener("click", () => {
            const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
            applyTheme(theme);
            savePreference(preferenceKeys.theme, theme);
        });
        document.querySelector("#language-toggle").addEventListener("click", () => {
            const language = currentLanguage === "vi" ? "en" : "vi";
            applyLanguage(language);
            savePreference(preferenceKeys.language, language);
        });
        window.addEventListener("storage", (event) => {
            if (event.key === preferenceKeys.theme && event.newValue) applyTheme(event.newValue);
            if (event.key === preferenceKeys.language && event.newValue) applyLanguage(event.newValue);
        });

        applyLanguage(currentLanguage);
        applyTheme(readPreference(preferenceKeys.theme, "light"));

        const challengeFrame = document.querySelector("#challenge-frame");
        window.addEventListener("message", (event) => {
            if (event.source !== challengeFrame.contentWindow || event.data?.type !== "mini-game-height") return;
            const height = Number(event.data.height);
            if (Number.isFinite(height)) challengeFrame.height = String(Math.max(360, Math.min(Math.ceil(height), 1200)));
        });
        challengeFrame.addEventListener("load", syncMiniGamePreferences);
        window.addEventListener("resize", syncMiniGamePreferences);
        let challengeFrameWidth = challengeFrame.getBoundingClientRect().width;
        if ("ResizeObserver" in window) {
            new ResizeObserver(() => {
                const width = challengeFrame.getBoundingClientRect().width;
                if (width === challengeFrameWidth) return;
                challengeFrameWidth = width;
                syncMiniGamePreferences();
            }).observe(challengeFrame);
        }

        const flipCard = document.querySelector(".flip-card");
        const flipFront = document.querySelector(".flip-front");
        const flipBack = document.querySelector(".flip-back");
        flipCard.addEventListener("click", () => {
            const isFlipped = flipCard.classList.toggle("is-flipped");
            flipCard.setAttribute("aria-pressed", String(isFlipped));
            flipCard.setAttribute("aria-label", translations[currentLanguage][isFlipped ? "flipToFront" : "flipToBack"]);
            flipFront.setAttribute("aria-hidden", String(isFlipped));
            flipBack.setAttribute("aria-hidden", String(!isFlipped));
        });

        const achievementTabs = [...document.querySelectorAll(".achievement-tab")];
        const achievementPanels = [...document.querySelectorAll(".achievement-tab-panel")];
        function selectAchievementTab(selectedTab) {
            achievementTabs.forEach((tab) => {
                const isSelected = tab === selectedTab;
                tab.setAttribute("aria-selected", String(isSelected));
                tab.tabIndex = isSelected ? 0 : -1;
            });
            achievementPanels.forEach((panel) => {
                panel.hidden = panel.id !== selectedTab.getAttribute("aria-controls");
            });
        }
        achievementTabs.forEach((tab, index) => {
            tab.addEventListener("click", () => selectAchievementTab(tab));
            tab.addEventListener("keydown", (event) => {
                let nextIndex;
                if (event.key === "ArrowRight") nextIndex = (index + 1) % achievementTabs.length;
                else if (event.key === "ArrowLeft") nextIndex = (index - 1 + achievementTabs.length) % achievementTabs.length;
                else if (event.key === "Home") nextIndex = 0;
                else if (event.key === "End") nextIndex = achievementTabs.length - 1;
                else return;

                event.preventDefault();
                const nextTab = achievementTabs[nextIndex];
                selectAchievementTab(nextTab);
                nextTab.focus();
            });
        });

        const achievementLightbox = document.querySelector("#achievement-lightbox");
        const achievementLightboxImage = document.querySelector("#achievement-lightbox-image");
        const achievementLightboxClose = document.querySelector(".achievement-lightbox-close");
        document.querySelectorAll(".achievement-image-link").forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const thumbnail = link.querySelector("img");
                achievementLightboxImage.src = link.href;
                achievementLightboxImage.alt = thumbnail.alt;
                achievementLightbox.showModal();
                achievementLightboxClose.focus();
            });
        });
        achievementLightboxClose.addEventListener("click", () => achievementLightbox.close());
        achievementLightbox.addEventListener("click", (event) => {
            if (event.target === achievementLightbox) achievementLightbox.close();
        });
        achievementLightbox.addEventListener("close", () => {
            achievementLightboxImage.removeAttribute("src");
        });

        const readingProgress = document.querySelector("#reading-progress");
        let progressFrame = 0;
        function updateReadingProgress() {
            if (progressFrame) return;
            progressFrame = requestAnimationFrame(() => {
                const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = scrollableHeight > 0 ? Math.round((window.scrollY / scrollableHeight) * 100) : 0;
                readingProgress.style.setProperty("--progress", `${progress}%`);
                readingProgress.setAttribute("aria-valuenow", String(progress));
                progressFrame = 0;
            });
        }
        window.addEventListener("scroll", updateReadingProgress, { passive: true });
        window.addEventListener("resize", updateReadingProgress);
        updateReadingProgress();

        const backToTop = document.querySelector("#back-to-top");
        function updateBackToTopVisibility() {
            backToTop.classList.toggle("is-visible", window.scrollY > 320);
        }
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
            });
        });
        window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
        updateBackToTopVisibility();

        const contactChatToggle = document.querySelector("#contact-chat-toggle");
        const contactChatPanel = document.querySelector("#contact-chat-panel");
        const contactChatClose = document.querySelector("#contact-chat-close");
        const contactForm = document.querySelector("#contact-chat-form");
        const contactFormStatus = document.querySelector("#contact-form-status");
        const contactName = document.querySelector("#contact-name");
        const contactEmail = document.querySelector("#contact-email");
        const contactMessage = document.querySelector("#contact-message");
        const contactEmailAddress = "25050055@student.bdu.edu.vn";
        const contactChatHeader = document.querySelector(".header");
        const contactNavigation = document.querySelector("#nav-links");
        let contactToggleDrag = null;
        let suppressContactToggleClick = false;

        function getContactChatTopBoundary() {
            const headerBottom = contactChatHeader.getBoundingClientRect().bottom;
            if (!contactNavigation.classList.contains("show")) return headerBottom;
            return Math.max(headerBottom, contactNavigation.getBoundingClientRect().bottom);
        }

        function setContactChatTogglePosition(left, top) {
            const toggleWidth = contactChatToggle.offsetWidth;
            const toggleHeight = contactChatToggle.offsetHeight;
            const maxLeft = Math.max(12, window.innerWidth - toggleWidth - 12);
            const maxTop = Math.max(12, window.innerHeight - toggleHeight - 12);
            const minTop = Math.min(getContactChatTopBoundary() + 12, maxTop);

            contactChatToggle.style.left = `${Math.min(Math.max(left, 12), maxLeft)}px`;
            contactChatToggle.style.top = `${Math.min(Math.max(top, minTop), maxTop)}px`;
            contactChatToggle.style.right = "auto";
            contactChatToggle.style.bottom = "auto";
        }

        function positionContactChatPanel() {
            const viewportPadding = 12;
            const gap = 12;
            const topBoundary = getContactChatTopBoundary();
            const maxPanelWidth = Math.max(0, window.innerWidth - viewportPadding * 2);
            const toggleRect = contactChatToggle.getBoundingClientRect();
            const availableAbove = Math.max(
                0,
                toggleRect.top - gap - topBoundary - viewportPadding
            );
            const availableBelow = Math.max(
                0,
                window.innerHeight - viewportPadding - toggleRect.bottom - gap
            );
            const placeAboveToggle = availableAbove >= availableBelow;
            const availablePanelHeight = placeAboveToggle ? availableAbove : availableBelow;

            contactChatPanel.style.width = `${Math.min(380, maxPanelWidth)}px`;
            contactChatPanel.style.maxHeight =
                `${Math.min(620, availablePanelHeight)}px`;

            const panelRect = contactChatPanel.getBoundingClientRect();
            const maxLeft = Math.max(viewportPadding, window.innerWidth - panelRect.width - viewportPadding);
            const maxTop = Math.max(viewportPadding, window.innerHeight - panelRect.height - viewportPadding);
            const minTop = Math.min(topBoundary + viewportPadding, maxTop);
            const panelTop = placeAboveToggle
                ? toggleRect.top - panelRect.height - gap
                : toggleRect.bottom + gap;
            const panelLeft = Math.min(
                Math.max(toggleRect.right - panelRect.width, viewportPadding),
                maxLeft
            );

            contactChatPanel.style.left = `${panelLeft}px`;
            contactChatPanel.style.top = `${panelTop}px`;
            contactChatPanel.style.right = "auto";
            contactChatPanel.style.bottom = "auto";
        }

        function setContactChatOpen(isOpen) {
            contactChatPanel.hidden = !isOpen;
            contactChatToggle.setAttribute("aria-expanded", String(isOpen));
            contactChatToggle.setAttribute(
                "aria-label",
                translations[currentLanguage][isOpen ? "contactChatClose" : "contactChatOpen"]
            );
            if (isOpen) {
                positionContactChatPanel();
                contactName.focus();
            } else {
                contactChatToggle.focus();
            }
        }

        contactChatToggle.addEventListener("pointerdown", (event) => {
            if (event.button !== 0) return;
            const toggleRect = contactChatToggle.getBoundingClientRect();
            contactToggleDrag = {
                pointerId: event.pointerId,
                startX: event.clientX,
                startY: event.clientY,
                left: toggleRect.left,
                top: toggleRect.top,
                moved: false
            };
            contactChatToggle.setPointerCapture(event.pointerId);
        });
        contactChatToggle.addEventListener("pointermove", (event) => {
            if (!contactToggleDrag || event.pointerId !== contactToggleDrag.pointerId) return;
            const deltaX = event.clientX - contactToggleDrag.startX;
            const deltaY = event.clientY - contactToggleDrag.startY;
            if (!contactToggleDrag.moved && Math.hypot(deltaX, deltaY) < 5) return;
            contactToggleDrag.moved = true;
            setContactChatTogglePosition(
                contactToggleDrag.left + deltaX,
                contactToggleDrag.top + deltaY
            );
        });
        function finishContactChatDrag(event) {
            if (!contactToggleDrag || event.pointerId !== contactToggleDrag.pointerId) return;
            suppressContactToggleClick = contactToggleDrag.moved;
            contactToggleDrag = null;
            if (suppressContactToggleClick) {
                window.setTimeout(() => {
                    suppressContactToggleClick = false;
                }, 250);
            }
        }
        contactChatToggle.addEventListener("pointerup", finishContactChatDrag);
        contactChatToggle.addEventListener("pointercancel", finishContactChatDrag);
        contactChatToggle.addEventListener("click", () => {
            if (suppressContactToggleClick) {
                suppressContactToggleClick = false;
                return;
            }
            setContactChatOpen(contactChatPanel.hidden);
        });
        contactChatClose.addEventListener("click", () => setContactChatOpen(false));
        window.addEventListener("resize", () => {
            if (contactChatToggle.style.left) {
                const toggleRect = contactChatToggle.getBoundingClientRect();
                setContactChatTogglePosition(toggleRect.left, toggleRect.top);
            }
            if (!contactChatPanel.hidden) positionContactChatPanel();
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && !contactChatPanel.hidden) {
                setContactChatOpen(false);
            }
        });
        contactForm.addEventListener("input", (event) => {
            if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)) return;
            event.target.removeAttribute("aria-invalid");
            contactFormStatus.textContent = "";
            contactFormStatus.classList.remove("is-error");
        });
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = contactName.value.trim();
            const email = contactEmail.value.trim();
            const message = contactMessage.value.trim();
            const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            const fields = [
                { input: contactName, isValid: name.length >= 2 && name.length <= 80, error: "contactNameError" },
                { input: contactEmail, isValid: email.length <= 254 && emailIsValid, error: "contactEmailError" },
                { input: contactMessage, isValid: message.length >= 10 && message.length <= 2000, error: "contactMessageError" }
            ];
            let firstInvalidField;

            fields.forEach(({ input, isValid, error }) => {
                if (isValid) {
                    input.removeAttribute("aria-invalid");
                    return;
                }
                input.setAttribute("aria-invalid", "true");
                if (!firstInvalidField) {
                    firstInvalidField = input;
                    contactFormStatus.textContent = translations[currentLanguage][error];
                }
            });

            if (firstInvalidField) {
                contactFormStatus.classList.add("is-error");
                firstInvalidField.focus();
                return;
            }

            const subject = `Portfolio contact from ${name}`;
            const body = `${message}\n\nFrom: ${name}\nEmail: ${email}`;
            contactFormStatus.classList.remove("is-error");
            contactFormStatus.textContent = translations[currentLanguage].contactFormSending;
            window.location.href = `mailto:${contactEmailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });

        const navigation = document.querySelector(".nav-links");
        navigation.addEventListener("shown.bs.collapse", () => {
            const toggleRect = contactChatToggle.getBoundingClientRect();
            if (toggleRect.top < getContactChatTopBoundary() + 12) {
                setContactChatTogglePosition(toggleRect.left, toggleRect.top);
            }
            if (!contactChatPanel.hidden) positionContactChatPanel();
        });
        navigation.addEventListener("click", (event) => {
            if (event.target instanceof HTMLAnchorElement) {
                bootstrap.Collapse.getOrCreateInstance(navigation).hide();
            }
        });