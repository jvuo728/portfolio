document.addEventListener('DOMContentLoaded', () => {
  // Typing animation
  const words = document.querySelectorAll('.typing-words span');
  let currentWordIndex = 0;
  let isDeleting = false;
  let text = '';
  let typingSpeed = 100;

  function type() {
    const currentWord = words[currentWordIndex];
    const fullText = currentWord.getAttribute('data-text') || currentWord.textContent;
    
    // Save the full text as a data attribute on first run
    if (!currentWord.getAttribute('data-text')) {
      words.forEach(word => word.setAttribute('data-text', word.textContent));
    }
    
    if (isDeleting) {
      text = fullText.substring(0, text.length - 1);
      typingSpeed = 50;
    } else {
      text = fullText.substring(0, text.length + 1);
      typingSpeed = 100;
    }

    words.forEach(word => word.style.display = 'none');
    currentWord.style.display = 'inline';
    currentWord.textContent = text;

    if (!isDeleting && text === fullText) {
      typingSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && text === '') {
      isDeleting = false;
      currentWordIndex = (currentWordIndex + 1) % words.length;
      typingSpeed = 500; // Pause before starting new word
    }

    setTimeout(type, typingSpeed);
  }

  type();

  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetSection.offsetTop - 20,
        behavior: 'smooth'
      });
    });
  });

  // Intersection Observer for project animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Apply animation to projects
  document.querySelectorAll('.project').forEach(project => {
    project.style.opacity = '0';
    project.style.transform = 'translateY(20px)';
    project.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(project);
  });

  // Ensure social links work
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      window.open(this.href, '_blank', 'noopener,noreferrer');
    });
  });
}); 