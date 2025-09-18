document.addEventListener('DOMContentLoaded', () => {
    // שנה אוטומטית בפוטר
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // גלילה רכה לעוגנים
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href').slice(1);
            const el = document.getElementById(id);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        });
    });
// כפתור "העתקת מייל"
    const copyBtn = document.getElementById('copyMailBtn');
    const mailEl = document.getElementById('mailLink');
    const copied = document.getElementById('mailCopied');

    if (copyBtn && mailEl && navigator.clipboard) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(mailEl.textContent.trim());
                copied.hidden = false;
                setTimeout(() => (copied.hidden = true), 1500);
            } catch (e) {
                // fallback: בחרי את הטקסט ידנית אם צריך
                alert('אי אפשר להעתיק אוטומטית בדפדפן הזה, נסי לסמן ולהעתיק ידנית.');
            }
        });
    }
    // פופאפ צור קשר
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('closePopup');

// כל כפתור שפותח את הפופאפ
    const openers = document.querySelectorAll('#openContact, #openContactPoster, [data-open="contact"]');

    openers.forEach(btn => {
        btn?.addEventListener('click', () => {
            popup.classList.add('is-open');
            document.body.style.overflow = 'hidden'; // לא לגלול רקע
        });
    });

    closeBtn?.addEventListener('click', () => closePopup());
    popup?.addEventListener('click', (e) => {
        // סגירה בלחיצה על הרקע (לא על התיבה הפנימית)
        if (e.target === popup) closePopup();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePopup();
    });

    function closePopup() {
        popup.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    // קרוסלת המלצות
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial-dots .dot');

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);

            // מצב מובייל – הצג אחת בלבד
            if (window.innerWidth < 768) {
                testimonials.forEach((el, i) => {
                    el.style.display = i === index ? 'block' : 'none';
                });
            } else {
                // בדסקטופ – הצג 3 בבת אחת
                const groupStart = index * 3;
                testimonials.forEach((el, i) => {
                    el.style.display = (i >= groupStart && i < groupStart + 3) ? 'block' : 'none';
                });
            }

            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        });
    });

    // הפעלה ראשונית
    dots[0].click();
});
