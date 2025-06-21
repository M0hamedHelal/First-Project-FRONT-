document.addEventListener('DOMContentLoaded', function() {
    // الحصول على عناصر التنقل
    const navToggle = document.querySelector('.nav-toggle') || document.createElement('div');
    const navLinks = document.querySelector('.nav-links') || document.querySelector('.nav .nav-links');
    const navbar = document.querySelector('.navbar');
    
    // إضافة خصائص CSS للانتقال السلس
    if (navbar) {
        navbar.style.transition = 'transform 0.4s ease, background-color 0.3s ease, box-shadow 0.3s ease';
        navbar.style.position = 'fixed';
        navbar.style.width = '100%';
        navbar.style.top = '0';
        navbar.style.zIndex = '1000';
    }
    
    // تفعيل زر القائمة المنسدلة للهواتف المحمولة (إذا كان موجوداً)
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // تغيير لون الشريط العلوي عند التمرير فقط
    window.addEventListener('scroll', function() {
        if (navbar) {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            
            // تغيير لون الخلفية عند التمرير
            if (scrollTop > 100) {
                navbar.style.backgroundColor = '#222222';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.backgroundColor = 'transparent';
                navbar.style.boxShadow = 'none';
            }
            
            // الشريط العلوي دائمًا مرئي بغض النظر عن اتجاه التمرير
            navbar.style.transform = 'translateY(0)';
        }
    });
    
    // تحديد الصفحة الحالية في القائمة
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links li a');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || 
            (currentPage === 'index.html' && (href === '' || href === '#' || href === 'index.html'))) {
            item.classList.add('current');
        }
    });
    
    // إضافة تأثير سلس عند الضغط على روابط التنقل الداخلية
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // تعديل للوضع الثابت للشريط العلوي
                        behavior: 'smooth'
                    });
                    
                    // إغلاق القائمة المنسدلة بعد النقر (للهواتف المحمولة)
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                    }
                }
            }
        });
    });
});