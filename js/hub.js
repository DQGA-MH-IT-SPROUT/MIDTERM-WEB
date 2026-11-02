    // Keep member details and links together here so the table is easy to update.
    const MEMBERS = [
      {
        id: "ky",
        name: "Nguyễn Vĩnh Kỳ",
        rank: "A",
        suit: "♠",
        color: "black",
        label: "ÁT BÍCH",
        role: "Sinh viên Công nghệ thông tin · Kỹ thuật phần mềm",
        description: "Sinh viên năm hai tại Đại học Bình Dương, quan tâm đến lập trình và phát triển website. Đang xây nền tảng kỹ thuật, tư duy logic và kinh nghiệm thực hành.",
        tags: ["Phần mềm", "Thiết kế web", "Giải quyết vấn đề"],
        image: "images/member-ky.jpg",
        initials: "K",
        page: "SubPages/NguyenVinhKy/index.html"
      },
      {
        id: "toan",
        name: "Lê Minh Toàn",
        rank: "A",
        suit: "♥",
        color: "red",
        label: "ÁT CƠ",
        role: "Sinh viên Công nghệ thông tin",
        description: "Người hướng nội, thích khám phá máy móc và không ngừng học hỏi. Mong muốn trở thành kỹ sư IT, xây dựng những giải pháp công nghệ hữu ích.",
        tags: ["AI", "Robot học", "Công nghệ"],
        image: "images/member-toan.jpeg",
        initials: "T",
        page: "SubPages/LeMinhToan/LMT.html"
      },
      {
        id: "gia-an",
        name: "Dương Quang Gia Ân",
        rank: "J",
        suit: "✦",
        color: "joker",
        label: "THE JOKER",
        role: "Người học hỏi · Thành viên bí ẩn",
        description: "Luôn tò mò về cách mọi thứ hoạt động, thích thử điều chưa biết và biến những ý tưởng nhỏ thành trải nghiệm thật trên web.",
        tags: ["Tò mò", "Sáng tạo web", "Ý tưởng"],
        image: "images/member-gia-an.gif",
        profileImage: "images/member-gia-an-profile.png",
        initials: "Â",
        page: "SubPages/DuongQuangGiaAn/index.html"
      },
      {
        id: "hoang",
        name: "Trì Gia Hoàng",
        rank: "A",
        suit: "♦",
        color: "red",
        label: "ÁT RÔ",
        role: "Sinh viên Thiết kế Web",
        description: "Sinh viên Công nghệ thông tin tại Đại học Bình Dương. Tự nhận mình vui vẻ, hòa đồng, thích giúp đỡ mọi người và luôn chịu khó.",
        tags: ["Thiết kế web", "Hòa đồng", "Sẵn lòng giúp đỡ"],
        image: "images/member-hoang.png",
        initials: "H",
        page: "SubPages/TriGiaHoang/wed%204.html"
      },
      {
        id: "thai",
        name: "Trương Quang Thái",
        rank: "A",
        suit: "♣",
        color: "black",
        label: "ÁT TÉP",
        role: "Sinh viên năm 2 · Khóa 25",
        description: "Đang rèn luyện kiến thức nền tảng, chủ động thực hành và nhìn lại từng sản phẩm để cải thiện. Tin vào cách học: Học – Hỏi – Hiểu – Hành.",
        tags: ["Thực hành", "Học hỏi", "Phát triển"],
        image: "images/member-thai.jpg",
        initials: "Th",
        page: "SubPages/TruongQuangThai/index.html"
      }
    ];

    const cardArc = document.getElementById("cardArc");
    const tableStage = document.getElementById("tableStage");
    const memberDetail = document.getElementById("memberDetail");
    const featuredCardSlot = document.getElementById("featuredCardSlot");
    const experienceNotice = document.getElementById("experienceNotice");
    const profilePreview = document.getElementById("profilePreview");
    const previewFrame = document.getElementById("previewFrame");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reshuffleButton = document.getElementById("reshuffleButton");
    const reshuffleLabel = document.getElementById("reshuffleLabel");

    function createDealOrder() {
      const joker = MEMBERS.find((member) => member.color === "joker");
      const aces = MEMBERS.filter((member) => member.color !== "joker");
      for (let index = aces.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [aces[index], aces[randomIndex]] = [aces[randomIndex], aces[index]];
      }
      const middle = Math.floor(aces.length / 2);
      return [...aces.slice(0, middle), joker, ...aces.slice(middle)];
    }

    let dealOrder = createDealOrder();
    const cardSounds = {
      swap: new Audio("sound/card-swap.mp3"),
      flip: new Audio("sound/card-flip.mp3"),
      joker: new Audio("sound/roblox-explosion-sound.mp3"),
      laugh: new Audio("sound/muhehehe.mp3")
    };
    Object.values(cardSounds).forEach((audio) => { audio.preload = "auto"; });
    experienceNotice.showModal();
    document.getElementById("dismissExperience").addEventListener("click", () => {
      experienceNotice.close();
      startCardShuffle();
    });
    let selectedMember = null;
    let jokerTransformTimer = 0;
    let shuffleInProgress = false;
    let jokerTransformed = false;

    function startCardShuffle() {
      if (shuffleInProgress || selectedMember) return;
      shuffleInProgress = true;
      reshuffleButton.disabled = true;
      reshuffleLabel.textContent = "Đang xào bài...";
      document.getElementById("announcement").textContent = "Đang xào bài...";
      if (reducedMotion.matches) {
        finishShuffle();
        return;
      }
      cardArc.classList.add("is-shuffling");
      void performCardShuffle();
    }

    function animateCard(card, keyframes, duration) {
      return new Promise((resolve) => {
        const animation = card.animate(keyframes, { duration, easing: "ease-in-out", fill: "forwards" });
        animation.addEventListener("finish", () => {
          const style = getComputedStyle(card);
          card.style.top = style.top;
          card.style.left = style.left;
          card.style.transform = style.transform;
          animation.cancel();
          resolve();
        }, { once: true });
        animation.addEventListener("cancel", () => {
          resolve();
        }, { once: true });
      });
    }

    function cardPose(card, top, left, transform) {
      const style = getComputedStyle(card);
      return [
        { top: style.top, left: style.left, transform: style.transform },
        { top: `${top}px`, left: `${left}px`, transform }
      ];
    }

    async function performCardShuffle() {
      const cards = [...cardArc.querySelectorAll(".playing-card[data-member-id]")];
      const centerX = cardArc.clientWidth / 2;
      const stackTop = Math.round(cardArc.clientHeight * 0.23);
      const leftPacket = cards.slice(0, 2);
      const rightPacket = cards.slice(2);
      const stackTransform = (index) => `translate(-50%, ${index * 2}px) rotate(${(index - 2) * 0.7}deg) scale(.94)`;

      await Promise.all(cards.map((card, index) => {
        card.style.zIndex = String(index + 1);
        return animateCard(card, cardPose(card, stackTop, centerX, stackTransform(index)), 780);
      }));

      if (!shuffleInProgress) return;
      await Promise.all(cards.map((card) => {
        const isLeftPacket = leftPacket.includes(card);
        const packet = isLeftPacket ? leftPacket : rightPacket;
        const packetIndex = packet.indexOf(card);
        const packetX = isLeftPacket ? -42 : 42;
        const packetY = (packetIndex - (packet.length - 1) / 2) * 3;
        card.style.zIndex = String((isLeftPacket ? 0 : leftPacket.length) + packetIndex + 1);
        return animateCard(card, cardPose(
          card,
          stackTop,
          centerX,
          `translate(-50%, ${packetY}px) translateX(${packetX}px) rotate(${isLeftPacket ? -8 : 8}deg) scale(.97)`
        ), 850);
      }));

      if (!shuffleInProgress) return;
      const riffleOrder = [];
      for (let index = 0; index < rightPacket.length; index += 1) {
        if (leftPacket[index]) riffleOrder.push(leftPacket[index]);
        if (rightPacket[index]) riffleOrder.push(rightPacket[index]);
      }
      const placedCards = [];
      for (const card of riffleOrder) {
        if (!shuffleInProgress) return;
        const sourcePacket = leftPacket.includes(card) ? leftPacket : rightPacket;
        const packetX = sourcePacket === leftPacket ? -42 : 42;
        card.style.zIndex = String(cards.length + placedCards.length + 1);
        const targetIndex = placedCards.length;
        const style = getComputedStyle(card);
        await animateCard(card, [
          { top: style.top, left: style.left, transform: style.transform, offset: 0 },
          {
            top: `${stackTop - 22}px`,
            left: `${centerX + packetX / 2}px`,
            transform: `translate(-50%, -18px) rotate(${packetX < 0 ? -6 : 6}deg) scale(1.02)`,
            offset: 0.58
          },
          {
            top: `${stackTop}px`,
            left: `${centerX}px`,
            transform: stackTransform(targetIndex),
            offset: 1
          }
        ], 590);
        placedCards.push(card);
      }

      if (!shuffleInProgress) return;
      await Promise.all(placedCards.map((card, index) => {
        card.style.zIndex = String(index + 1);
        return animateCard(card, cardPose(card, stackTop, centerX, stackTransform(index)), 680);
      }));

      if (shuffleInProgress) finishShuffle();
    }

    function finishShuffle() {
      dealOrder = createDealOrder();
      dealOrder.forEach((member) => {
        const card = cardArc.querySelector(`[data-member-id="${member.id}"]`);
        if (!card) return;
        card.style.removeProperty("top");
        card.style.removeProperty("left");
        card.style.removeProperty("transform");
        card.style.removeProperty("z-index");
        cardArc.append(card);
      });
      cardArc.classList.remove("is-shuffling", "is-dealing");
      shuffleInProgress = false;
      if (reducedMotion.matches) {
        reshuffleButton.disabled = false;
        reshuffleLabel.textContent = "Xào lại";
        document.getElementById("announcement").textContent = "Bài đã được xào lại. Hãy chọn một lá bài.";
        return;
      }
      void cardArc.offsetWidth;
      cardArc.classList.add("is-dealing");
    }

    function playCardSound(audio) {
      if (!audio.paused) audio.pause();
      if (audio.readyState > 0) audio.currentTime = 0;
      audio.play().catch((error) => {
        console.warn("Card sound playback was unavailable in this browser.", error);
      });
    }

    function makeCard(member, featured = false) {
      const featuredJoker = featured && member.id === "gia-an";
      const card = document.createElement(featured && !featuredJoker ? "div" : "button");
      card.className = featured ? "playing-card featured-playing-card" : "playing-card";
      if (!featured || featuredJoker) {
        card.type = "button";
        if (!featured) {
          card.dataset.memberId = member.id;
          card.setAttribute("aria-pressed", "false");
          card.setAttribute("aria-label", `${member.label}: ${member.name}, ${member.role}`);
        } else {
          card.setAttribute("aria-label", "Phát tiếng cười của Chú Hề");
        }
      } else {
        card.setAttribute("aria-hidden", "true");
      }
      const flipper = document.createElement("span");
      flipper.className = "card-flipper";
      const back = document.createElement("span");
      back.className = "card-back";
      back.setAttribute("aria-hidden", "true");
      const face = document.createElement("span");
      face.className = `card-face ${member.color === "joker" ? "is-joker" : `is-${member.color}`}`;

      if (member.color === "joker") {
        const topCorner = document.createElement("span");
        topCorner.className = "joker-corner";
        const topRank = document.createElement("span");
        topRank.textContent = "JOKER";
        const topSuit = document.createElement("small");
        topSuit.textContent = "✦";
        topCorner.append(topRank, topSuit);
        const bottomCorner = document.createElement("span");
        bottomCorner.className = "joker-corner joker-corner-bottom";
        const bottomRank = document.createElement("span");
        bottomRank.textContent = "JOKER";
        const bottomSuit = document.createElement("small");
        bottomSuit.textContent = "✦";
        bottomCorner.append(bottomRank, bottomSuit);
        const crown = document.createElement("span");
        crown.className = "joker-crown";
        crown.textContent = "✦";
        const emblem = document.createElement("span");
        emblem.className = "joker-emblem";
        const image = document.createElement("img");
        image.src = jokerTransformed ? member.profileImage : member.image;
        image.alt = "";
        emblem.append(image);
        const flourish = document.createElement("span");
        flourish.className = "joker-flourish";
        flourish.setAttribute("aria-hidden", "true");
        flourish.textContent = "✦  ♦  ✦";
        const name = document.createElement("span");
        name.className = "joker-name";
        name.textContent = member.name;
        face.append(topCorner, bottomCorner, crown, emblem, flourish, name);
      } else {
        const topCorner = document.createElement("span");
        topCorner.className = "card-corner";
        const topRank = document.createElement("span");
        topRank.textContent = member.rank;
        const topSuit = document.createElement("small");
        topSuit.textContent = member.suit;
        topCorner.append(topRank, topSuit);
        const portrait = document.createElement("span");
        portrait.className = "card-portrait";
        if (member.image) {
          const image = document.createElement("img");
          image.src = member.image;
          image.alt = "";
          image.loading = "lazy";
          image.addEventListener("error", () => {
            const initial = document.createElement("span");
            initial.className = "portrait-initial";
            initial.textContent = member.initials;
            portrait.replaceChildren(initial);
          }, { once: true });
          portrait.append(image);
        } else {
          const initial = document.createElement("span");
          initial.className = "portrait-initial";
          initial.textContent = member.initials;
          portrait.append(initial);
        }
        const name = document.createElement("span");
        name.className = "card-name";
        name.textContent = member.name;
        const role = document.createElement("span");
        role.className = "card-role";
        role.textContent = member.role;
        const bottomCorner = document.createElement("span");
        bottomCorner.className = "card-corner card-corner-bottom";
        const bottomRank = document.createElement("span");
        bottomRank.textContent = member.rank;
        const bottomSuit = document.createElement("small");
        bottomSuit.textContent = member.suit;
        bottomCorner.append(bottomRank, bottomSuit);
        face.append(topCorner, portrait, name, role, bottomCorner);
      }
      flipper.append(back, face);
      card.append(flipper);
      if (featured) card.classList.add("is-face-up");
      return card;
    }

    function selectMember(member) {
      const source = cardArc.querySelector(`[data-member-id="${member.id}"]`);
      if (!source) return;
      cardArc.classList.remove("is-shuffling", "is-dealing");
      reshuffleButton.disabled = false;
      reshuffleLabel.textContent = "Xào lại";
      reshuffleButton.hidden = true;
      if (selectedMember?.id === "gia-an" && member.id === "gia-an") {
        replayJokerCard(source);
        return;
      }
      playCardSound(member.id === "gia-an" ? cardSounds.laugh : cardSounds.flip);
      cardArc.querySelectorAll(".playing-card").forEach((card) => {
        const isSelected = card === source;
        card.classList.toggle("is-selected", isSelected);
        card.classList.toggle("is-face-up", isSelected);
        card.classList.remove("is-spinning");
        card.setAttribute("aria-pressed", String(isSelected));
      });
      source.classList.add("is-spinning");
      selectedMember = member;
      tableStage.classList.add("has-selection");
      memberDetail.classList.remove("is-leaving");
      memberDetail.hidden = false;
      document.getElementById("memberKicker").textContent = member.label;
      document.getElementById("memberName").textContent = member.name;
      document.getElementById("memberRole").textContent = member.role;
      document.getElementById("memberDescription").textContent = member.description;
      document.getElementById("memberTags").replaceChildren(...member.tags.map((tag) => {
        const chip = document.createElement("span");
        chip.textContent = tag;
        return chip;
      }));
      const previewButton = document.getElementById("previewButton");
      previewButton.querySelector("span").textContent = "↗";
      previewButton.firstChild.textContent = "Xem trước hồ sơ ";
      document.getElementById("announcement").textContent = `Đã chọn ${member.name}. ${member.description}`;

      const featured = makeCard(member, true);
      featured.classList.add("is-spinning");
      featuredCardSlot.replaceChildren(featured);
      if (member.id === "gia-an") {
        featured.addEventListener("click", () => replayJokerCard(featured));
      }
      if (member.id === "gia-an" && !jokerTransformed) triggerJokerSupernova(featured, source, member);
    }

    function replayJokerCard(card) {
      playCardSound(cardSounds.laugh);
      card.classList.remove("is-spinning");
      void card.offsetWidth;
      card.classList.add("is-spinning");
    }

    function triggerJokerSupernova(featuredCard, sourceCard, member) {
      window.clearTimeout(jokerTransformTimer);
      const emblem = featuredCard.querySelector(".joker-emblem");
      emblem.classList.add("is-exploding");
      playCardSound(cardSounds.joker);
      jokerTransformTimer = window.setTimeout(() => {
        jokerTransformed = true;
        [sourceCard, featuredCard].forEach((card) => {
          const emblem = card.querySelector(".joker-emblem");
          const image = emblem.querySelector("img");
          if (image) {
            image.src = member.profileImage;
          }
        });
        emblem.classList.remove("is-exploding");
      }, 480);
    }

    function clearSelection() {
      if (!selectedMember) return;
      playCardSound(cardSounds.flip);
      selectedMember = null;
      tableStage.classList.remove("has-selection");
      memberDetail.classList.add("is-leaving");
      memberDetail.addEventListener("animationend", (event) => {
        if (event.animationName === "fade-panel-out" && memberDetail.classList.contains("is-leaving")) {
          memberDetail.hidden = true;
          memberDetail.classList.remove("is-leaving");
        }
      }, { once: true });
      featuredCardSlot.replaceChildren();
      reshuffleButton.hidden = false;
      cardArc.querySelectorAll(".playing-card").forEach((card) => {
        card.classList.remove("is-selected");
        card.classList.remove("is-face-up", "is-spinning");
        card.setAttribute("aria-pressed", "false");
      });
      document.getElementById("announcement").textContent = "Đã bỏ chọn. Hãy chọn một lá bài.";
    }

    dealOrder.forEach((member) => cardArc.append(makeCard(member)));
    cardArc.addEventListener("animationend", (event) => {
      if (event.animationName === "deal-in" && event.target === cardArc.lastElementChild) {
        cardArc.classList.remove("is-dealing");
        shuffleInProgress = false;
        reshuffleButton.disabled = false;
        reshuffleLabel.textContent = "Xào lại";
        document.getElementById("announcement").textContent = "Bài đã được xào lại. Hãy chọn một lá bài.";
      }
    });
    cardArc.addEventListener("click", (event) => {
      if (shuffleInProgress) return;
      const button = event.target.closest(".playing-card[data-member-id]");
      if (!button) return;
      const member = MEMBERS.find((candidate) => candidate.id === button.dataset.memberId);
      if (member) selectMember(member);
    });
    cardArc.addEventListener("pointerover", (event) => {
      const card = event.target.closest(".playing-card[data-member-id]");
      if (card && !card.contains(event.relatedTarget)) playCardSound(cardSounds.swap);
    });
    document.getElementById("clearSelection").addEventListener("click", clearSelection);
    reshuffleButton.addEventListener("click", startCardShuffle);

    document.getElementById("previewButton").addEventListener("click", () => {
      if (!selectedMember) return;
      document.getElementById("previewTitle").textContent = selectedMember.name;
      document.getElementById("enterProfile").href = selectedMember.page;
      previewFrame.title = `Hồ sơ của ${selectedMember.name}`;
      previewFrame.src = selectedMember.page;
      profilePreview.classList.remove("is-leaving");
      profilePreview.showModal();
      document.getElementById("closePreview").focus({ preventScroll: true });
    });
    function closePreview() {
      if (!profilePreview.open) return;
      profilePreview.close();
    }
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && profilePreview.open) {
        event.preventDefault();
        closePreview();
      }
    });
    profilePreview.addEventListener("close", () => {
      previewFrame.removeAttribute("src");
      profilePreview.classList.remove("is-leaving");
    });
    profilePreview.addEventListener("cancel", () => {
      previewFrame.removeAttribute("src");
      profilePreview.classList.remove("is-leaving");
    });
    document.getElementById("closePreview").addEventListener("click", closePreview);
    profilePreview.addEventListener("click", (event) => {
      if (event.target === profilePreview) closePreview();
    });
    document.getElementById("enterProfile").addEventListener("click", (event) => {
      if (!selectedMember) return;
      event.preventDefault();
      const targetPage = selectedMember.page;
      profilePreview.classList.add("is-leaving");
      window.setTimeout(() => { window.location.href = targetPage; }, reducedMotion.matches ? 0 : 420);
    });