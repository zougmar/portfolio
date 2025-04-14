document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Thanks for reaching out, Omar will get back to you soon!");
    this.reset();
  });
  

  // Language Switcher
  const translations = {
    en: {
      about_title: "About Me",
      about_text: "I’m Omar Zouglah, a Full-Stack Developer based in Casablanca, originally from Zagora. I develop scalable, fast web apps using React, Node.js, and MySQL. I'm multilingual and bring creativity and leadership to every project.",
      experience_title: "Experience",
      skills_title: "Skills",
      contact_title: "Contact Me",
      // ... Add more keys
    },
    fr: {
      about_title: "À propos de moi",
      about_text: "Je suis Omar Zouglah, développeur Full-Stack basé à Casablanca, originaire de Zagora. Je développe des applications web rapides et évolutives en utilisant React, Node.js et MySQL. Je suis multilingue et j’apporte créativité et leadership à chaque projet.",
      experience_title: "Expérience",
      skills_title: "Compétences",
      contact_title: "Contactez-moi",
      // ...
    },
    ar: {
      about_title: "نبذة عني",
      about_text: "أنا عمر زوڭلى، مطوّر Full-Stack كنعيش فـ كازا ومن أصل زڭورة. كنطوّر تطبيقات ويب سريعة وقابلة للتطوير باستعمال React، Node.js، وMySQL. كنهدَر بعدة لغات وكنجِيب الإبداع والقيادة فـ كل مشروع.",
      experience_title: "الخبرة",
      skills_title: "المهارات",
      contact_title: "تواصل معي",
      // ...
    }
  };
  
  function setLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
  
    // Direction for Arabic
    document.body.dir = lang === "ar" ? "rtl" : "ltr";
  }
  
  // Listener
  document.getElementById("lang-switcher").addEventListener("change", function () {
    setLanguage(this.value);
  });
  
  // Default language
  setLanguage("en");
// Contact Form  
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const status = document.getElementById("form-status");
  
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const data = new FormData(form);
  
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json"
        }
      });
  
      if (response.ok) {
        status.innerHTML = "<div class='alert alert-success'>Message sent successfully!</div>";
        form.reset();
      } else {
        status.innerHTML = "<div class='alert alert-danger'>Oops! Something went wrong.</div>";
      }
    });
  });
  