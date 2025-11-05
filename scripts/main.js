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
    },
    'feedback': {
        title: 'Зворотній зв\'язок: збір та аналіз',
        content: `
            <ul>
                <li>Соціальна мережи</li>
                <li>Зворотній зв'язок від клієнтів</li>
                <li>Голос і текст клієнта</li>
                <li>ВІПК</li>
                <li>Листування через email</li>
                <li>Роздріб</li>
                <li>НПС</li>
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
                
                // Додаємо обробники кліків для елементів списку
                addClickableListItems();
            } else {
                const buttonText = this.querySelector('.button__text').textContent;
                modalBody.innerHTML = `<h3>${buttonText}</h3><p>Інформація буде додана пізніше.</p>`;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Функція для додавання кліків на елементи списку
    function addClickableListItems() {
        const listItems = modalBody.querySelectorAll('ul li');
        listItems.forEach(item => {
            item.classList.add('clickable-item');
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                const itemText = this.textContent.trim();
                showSubContent(itemText);
            });
        });
    }

    // База даних з деталями для підпунктів
    const subContentData = {
        'Соціальна мережи': {
            type: 'list',
            items: [
                'Facebook',
                'TikTok',
                'Instagram',
                'Threads',
                'YouTube',
                'Telegram',
                'Linkedin',
                'Twitter'
            ]
        },
        'Зворотній зв\'язок від клієнтів': {
            type: 'list',
            items: [
                'Відгуки на сайті MOYO під товаром',
                'Відгук про магазин/мережу магазинів',
                'Відгуки в магазині (App Store, Google Market) при скачуванні застосунку',
                'Відгуки https://hotline.ua/ua/yp/11054/reviews/',
                'Відгуки Google maps',
                'Відгуки https://www.otzyvua.net/set-magazinov-moyo',
                'Відгуки Prom',
                'Відгуки Maudau',
                'Відгук з ОК'
            ]
        },
        'Голос і текст клієнта': {
            type: 'list',
            items: [
                'КЦ спілкування з клієнтом по телефону',
                'КЦ спілкування з клієнтом чат'
            ]
        },
        'НПС': {
            type: 'list',
            items: [
                'Опитування',
                'Смс'
            ]
        }
    };

    // Функція для відображення деталей підпункту
    function showSubContent(itemName) {
        // Зберігаємо поточний вміст модального вікна
        const currentContent = modalBody.innerHTML;
        
        // Отримуємо дані для цього підпункту
        const subData = subContentData[itemName];
        
        let contentHTML = '';
        
        if (subData) {
            if (subData.type === 'list' && subData.items.length > 0) {
                contentHTML = '<ul class="sub-list">';
                subData.items.forEach(item => {
                    contentHTML += `<li class="sub-list-item">${item}</li>`;
                });
                contentHTML += '</ul>';
            }
        } else {
            contentHTML = '<p class="placeholder-text">Детальна інформація буде додана пізніше.</p>';
        }
        
        // Показуємо детальну інформацію
        modalBody.innerHTML = `
            <button class="back-button" id="backButton">← Назад</button>
            <h3>${itemName}</h3>
            ${contentHTML}
        `;
        
        // Додаємо обробник для кнопки "Назад"
        const backButton = document.getElementById('backButton');
        backButton.addEventListener('click', function() {
            modalBody.innerHTML = currentContent;
            addClickableListItems(); // Відновлюємо кліки на списку
        });
    }

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
