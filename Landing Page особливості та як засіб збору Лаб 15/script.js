emailjs.init('581');  

document.getElementById('myForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const errorMessages = document.getElementById('errorMessages');
  const successMessage = document.getElementById('successMessage');

  // Очищення попередніх повідомлень
  errorMessages.innerHTML = '';
  successMessage.innerHTML = '';

  // Перевірка даних
  let errors = [];

  if (!name || !email || !message) {
      errors.push("Усі поля повинні бути заповнені.");
  }

  if (!validateEmail(email)) {
      errors.push("Невірний формат email.");
  }

  if (errors.length > 0) {
      errorMessages.innerHTML = errors.join('<br>');
  } else {
      successMessage.innerHTML = "Повідомлення успішно надіслано!";
      console.log(`Ім'я: ${name}`);
      console.log(`Email: ${email}`);
      console.log(`Повідомлення: ${message}`);

      // Інтеграція з аналітикою
      gtag('event', 'form_submission', {
          event_category: 'Contact Form',
          event_label: 'User Submitted Message',
          value: 1,
      });

      // Відправка даних через EmailJS
      emailjs.send('service_ag6250z', 'template_x80luwj', { 
          name: name,
          email: email,
          message: message
      })
      .then(function(response) {
          console.log('Email надіслано:', response);
      }, function(error) {
          console.error('Помилка при надсиланні листа:', error);
      });

      // Очищення форми
      document.getElementById('myForm').reset();
  }
});

// Перевірка формату email
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
}