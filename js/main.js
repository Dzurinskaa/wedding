// Инициализация EmailJS
emailjs.init('PUc2XPhkWvbVZfbj7');

// Календарь
function initCalendar() {
    const calendarBody = document.getElementById('calendarBody');
    const daysInMonth = 31;
    let day = 1;
    let html = '';

    html += '<tr>';
    for (let j = 0; j < 3; j++) html += '<td></td>';

    for (let j = 3; j < 7; j++) {
        const cellClass = (day === 8) ? 'wedding-day' : '';
        html += `<td class="${cellClass}">${day}</td>`;
        day++;
    }
    html += '</tr>';

    for (let i = 0; i < 4; i++) {
        html += '<tr>';
        for (let j = 0; j < 7; j++) {
            if (day > daysInMonth) {
                html += '<td></td>';
            } else {
                const cellClass = (day === 8) ? 'wedding-day' : '';
                html += `<td class="${cellClass}">${day}</td>`;
                day++;
            }
        }
        html += '</tr>';
    }

    calendarBody.innerHTML = html;
}

// Таймер
function updateCountdown() {
    const weddingDate = new Date('2027-07-08');
    const today = new Date();
    const daysDiff = Math.ceil((weddingDate - today) / (1000 * 3600 * 24));
    document.getElementById('daysLeft').textContent = daysDiff;
}

// Форма
document.getElementById('guestForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('guestName').value;
    const email = document.getElementById('guestEmail').value;
    const count = document.getElementById('guestCount').value;

    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;

    const templateParams = {
        from_name: name,
        from_email: email,
        guest_count: count,
        to_email: "alinochka200455@gmail.com",
        wedding_date: "08.07.2027",
        reply_to: email,
        submission_date: new Date().toLocaleDateString('ru-RU'),
        submission_time: new Date().toLocaleTimeString('ru-RU')
    };

    emailjs.send('service_hk1ybie', 'template_jfe25kr', templateParams)
        .then(function() {
            formMessage.textContent = `Спасибо, ${name}! Ваше присутствие подтверждено.`;
            formMessage.style.color = '#8b7355';
            formMessage.style.display = 'block';

            submitBtn.textContent = 'Подтверждено!';
            submitBtn.style.backgroundColor = '#8b7355';

            document.getElementById('guestForm').reset();

            setTimeout(() => {
                submitBtn.textContent = 'Подтвердить присутствие';
                submitBtn.style.backgroundColor = '#b0a48a';
                submitBtn.disabled = false;
                formMessage.style.display = 'none';
            }, 5000);

        }, function() {
            formMessage.textContent = 'Ошибка отправки. Свяжитесь с нами напрямую.';
            formMessage.style.color = '#e74c3c';
            formMessage.style.display = 'block';

            submitBtn.textContent = 'Попробовать снова';
            submitBtn.disabled = false;
        });
});

// Telegram
document.getElementById('telegramBtn').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Ссылка появится позже');
});

// Запуск
window.addEventListener('DOMContentLoaded', function() {
    initCalendar();
    updateCountdown();
    setInterval(updateCountdown, 86400000);
});