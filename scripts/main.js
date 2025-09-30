// Вміст для кнопок
const buttonContent = {
    'responsibility-center': {
        title: 'Центр відповідальності',
        content: `
            <ul>
                <li>SEO</li>
                <li>Департамент омніканальності та клієнтського досвіду</li>
            </ul>
        `
    },
    'kpi': {
        title: 'KPI',
        content: `
            <ul>
                <li>Retention – показник утримання клієнтів</li>
                <li>Churn – показник втрати клієнтів</li>
                <li>NPS – індекс готовності рекомендувати компанію</li>
                <li>CSAT – індекс задоволеності клієнтів</li>
                <li>CES – оцінка простоти взаємодії</li>
            </ul>
        `
    }
};

// Ініціалізація
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.button');
    const modal = document.getElementById('contentModal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.getElementById('closeModal');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const contentKey = this.getAttribute('data-content');
            const content = buttonContent[contentKey];
            
            if (content) {
                modalBody.innerHTML = `<h3>${content.title}</h3>${content.content}`;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                const buttonText = this.querySelector('.button__text').textContent;
                modalBody.innerHTML = `<h3>${buttonText}</h3><p>Інформація буде додана пізніше.</p>`;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal__overlay')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    const blocks = document.querySelectorAll('.block');
    blocks.forEach((block, index) => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(30px)';
        setTimeout(() => {
            block.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            block.style.opacity = '1';
            block.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
