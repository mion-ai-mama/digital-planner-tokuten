/**
 * script.js — ページの動き（コピー機能・アコーディオン・スクロール演出）
 * 文章は index.html を直接編集してください（content.js方式は使いません）。
 */

(function () {
  "use strict";

  /* ------------------------------------------------------------
     設定値（ここだけ書き換えればOK）
     LINE_URL      : 最終CTAボタンの遷移先（空のままだとボタンは表示されません）
     OGP_IMAGE_URL : SNSシェア用の画像URL（空なら og:image は出力しません）
  ------------------------------------------------------------ */
  const LINE_URL = "https://sub.aione.co.jp/line/open/ErxG3f10mmcK?mtid=8LTecV7UlNz5";
  const OGP_IMAGE_URL = "";

  /* ------------------------------------------------------------
     コピー機能（クリップボードAPI／古いブラウザ向けの代替あり）
  ------------------------------------------------------------ */
  function legacyCopy(text) {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      return successful;
    } catch (e) {
      return false;
    }
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        () => true,
        () => legacyCopy(text)
      );
    }
    return Promise.resolve(legacyCopy(text));
  }

  function bindCopyDelegation() {
    document.addEventListener("click", function (e) {
      const btn = e.target.closest(".copy-btn[data-copy-target]");
      if (!btn) return;
      const target = document.getElementById(btn.getAttribute("data-copy-target"));
      if (!target) return;
      copyText(target.textContent).then((ok) => {
        if (!ok) return;
        btn.classList.add("is-copied");
        window.clearTimeout(btn._copyTimeout);
        btn._copyTimeout = window.setTimeout(() => btn.classList.remove("is-copied"), 2200);
      });
    });
  }

  /* ------------------------------------------------------------
     アコーディオン（うまくいかないとき）
  ------------------------------------------------------------ */
  function bindAccordion() {
    document.addEventListener("click", function (e) {
      const question = e.target.closest(".accordion-item__question");
      if (!question) return;
      const expanded = question.getAttribute("aria-expanded") === "true";
      question.setAttribute("aria-expanded", String(!expanded));
    });
  }

  /* ------------------------------------------------------------
     スクロールで軽くフェードインする演出
  ------------------------------------------------------------ */
  function setupRevealAnimation() {
    const revealEls = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  function applyConfig() {
    ["cta-button", "cta-banner"].forEach((id) => {
      const link = document.getElementById(id);
      if (link && LINE_URL) {
        link.setAttribute("href", LINE_URL);
        link.hidden = false;
      }
    });
    if (OGP_IMAGE_URL) {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:image");
      meta.setAttribute("content", OGP_IMAGE_URL);
      document.head.appendChild(meta);
    }
  }

  function init() {
    applyConfig();
    bindCopyDelegation();
    bindAccordion();
    setupRevealAnimation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
