
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const submitButton = document.getElementById('contactSubmit');
  const statusEl = document.getElementById('contactStatus');
  const endpoint = 'https://brea-cari-production.up.railway.app/api/contact';

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    statusEl.style.color = '#69768a';
    statusEl.textContent = '';
    submitButton.disabled = true;
    submitButton.textContent = 'Gönderiliyor...';

    const payload = {
      name: document.getElementById('contactName').value.trim(),
      email: document.getElementById('contactEmail').value.trim(),
      subject: document.getElementById('contactSubject').value.trim(),
      message: document.getElementById('contactMessage').value.trim()
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Mesaj gönderilemedi');
      form.reset();
      statusEl.style.color = '#0aa66e';
      statusEl.textContent = 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.';
    } catch (error) {
      statusEl.style.color = '#e5484d';
      statusEl.textContent = 'Mesajınız gönderilemedi. Lütfen support@penzapp.com adresinden bize ulaşın.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Gönder';
    }
  });
})();
