    // cursor

    const cursor = document.getElementById('cursor');
    const trail  = document.getElementById('cursor-trail');
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
      trail.style.left  = e.clientX + 'px';
      trail.style.top   = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .project-card, .skill-chip').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '32px';
        cursor.style.height = '32px';
        cursor.style.borderColor = 'rgba(0,255,65,0.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '16px';
        cursor.style.height = '16px';
        cursor.style.borderColor = 'var(--green)';
      });
    });
    
    // Matrix rain
    
    (function() {
      const canvas = document.getElementById('matrix-canvas');
      const ctx    = canvas.getContext('2d');
      let cols, drops;

      function init() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        const fontSize = 14;
        cols  = Math.floor(canvas.width / fontSize);
        drops = Array(cols).fill(1);
      }

      function draw() {
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff41';
        ctx.font = '14px Share Tech Mono';

        const chars = '0101001010010101010101011001001010';
        drops.forEach((y, i) => {
          const ch = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(ch, i * 14, y * 14);
          if (y * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        });
      }

      init();
      window.addEventListener('resize', init);
      setInterval(draw, 55);
    })();

    // typing effect
    
    (function() {
      const roles = [
        'Cyber Security Analyst.',
        'OSINT Researcher',
        'Digital Footprint Analyst.',
        'Problem Solver.',
        'Reconnaissance Thinker. ',
        'Penetration Tester'
      ];
      const el = document.getElementById('typed-text');
      let ri = 0, ci = 0, deleting = false;

      function type() {
        const current = roles[ri];
        el.textContent = deleting ? current.substring(0, ci--) : current.substring(0, ci++);

        let speed = deleting ? 40 : 80;
        if (!deleting && ci === current.length + 1) {
          speed = 2000; deleting = true;
        } else if (deleting && ci === 0) {
          deleting = false;
          ri = (ri + 1) % roles.length;
          speed = 400;
        }
        setTimeout(type, speed);
      }
      setTimeout(type, 1000);
    })();

    // scroll reveal

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          // timeline
          if (e.target.classList.contains('timeline-item')) {
            e.target.classList.add('visible');
          }
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal, .timeline-item').forEach(el => observer.observe(el));

    // count up animation

    const countObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseInt(el.dataset.count);
          let current = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current + (target === 99 ? '%' : '+');
            if (current >= target) clearInterval(timer);
          }, 35);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-value[data-count]').forEach(el => countObserver.observe(el));

   // nav active state on scroll
   
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) current = s.id;
      });
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + current
          ? 'var(--green)'
          : '';
      });
    });