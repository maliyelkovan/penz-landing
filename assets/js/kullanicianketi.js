(function () {
  const form = document.getElementById('surveyForm');
  if (!form) return;
  // Statik siteden anket yanıtlarını e-posta ile iletir. İlk kullanımda FormSubmit, alıcı adrese doğrulama e-postası gönderir.
  const endpoint = 'https://formsubmit.co/ajax/anket@penzapp.com';
  const submitButton = document.getElementById('surveySubmit');
  const statusEl = document.getElementById('surveyStatus');
  const successEl = document.getElementById('surveySuccess');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const respondentId = document.getElementById('respondentId');
  const surveySource = document.getElementById('surveySource');
  const identityCard = document.getElementById('identityCard');
  const identityError = document.getElementById('identityError');
  const fullName = document.getElementById('fullName');
  const companyName = document.getElementById('companyName');
  const emailAddress = document.getElementById('emailAddress');
  const params = new URLSearchParams(window.location.search);

  respondentId.value = params.get('id') || '';
  surveySource.value = params.get('source') || '';

  const questions = Array.from(form.querySelectorAll('.question'));
  const requiredQuestions = questions.filter(q => q.dataset.required === 'true');

  function answered(question) {
    const radios = question.querySelectorAll('input[type="radio"]');
    const checks = question.querySelectorAll('input[type="checkbox"]');
    const textareas = question.querySelectorAll('textarea');
    if (radios.length) return !!question.querySelector('input[type="radio"]:checked');
    if (checks.length) return !!question.querySelector('input[type="checkbox"]:checked') || !!question.querySelector('.other input')?.value.trim();
    if (textareas.length) return !!textareas[0].value.trim();
    return true;
  }

  function updateProgress() {
    const count = requiredQuestions.filter(answered).length;
    const pct = Math.round((count / requiredQuestions.length) * 100);
    progressBar.style.width = pct + '%';
    progressText.textContent = pct === 100 ? 'Göndermeye hazırsınız' : '%' + pct + ' tamamlandı';
  }

  form.addEventListener('change', function (event) {
    const q = event.target.closest('.question');
    if (q) q.classList.remove('invalid');

    if (event.target.name === 'q7') {
      const checked = form.querySelectorAll('input[name="q7"]:checked');
      if (checked.length > 2) {
        event.target.checked = false;
      }
      const total = form.querySelectorAll('input[name="q7"]:checked').length;
      document.getElementById('q7Hint').textContent = total + ' / 2 seçildi';
    }
    updateProgress();
  });

  form.addEventListener('input', function (event) {
    const q = event.target.closest('.question');
    if (q) q.classList.remove('invalid');
    updateProgress();
  });

  function identityValid() {
    const emailOk = emailAddress.validity.valid && emailAddress.value.trim().length > 3;
    const ok = fullName.value.trim().length > 1 && companyName.value.trim().length > 1 && emailOk;
    identityCard.classList.toggle('invalid', !ok);
    return ok;
  }

  [fullName, companyName, emailAddress].forEach(function (input) {
    input.addEventListener('input', function () {
      identityCard.classList.remove('invalid');
    });
  });

  function collectPayload() {
    const data = new FormData(form);
    const value = name => data.get(name) || '';
    const values = name => data.getAll(name);
    return {
      _subject: 'Penz Kullanıcı Anketi – ' + value('full_name') + ' – ' + value('company_name'),
      _template: 'table',
      _captcha: 'false',
      ad_soyad: value('full_name'),
      firma_adi: value('company_name'),
      e_posta: value('email'),
      respondent_id: value('respondent_id'),
      source: value('source'),
      submitted_at: new Date().toISOString(),
      q1_reasons: values('q1'),
      q1_other: value('q1_other'),
      q2_previous_method: value('q2'),
      q2_other: value('q2_other'),
      q3_main_reason_not_continuing: value('q3'),
      q3_other: value('q3_other'),
      q4_missing_features: values('q4'),
      q4_other: value('q4_other'),
      q5_current_tool: value('q5'),
      q6_most_important_need: value('q6'),
      q7_features_to_return: values('q7'),
      q7_other: value('q7_other'),
      q8_price_view: value('q8'),
      q9_use_again: value('q9'),
      q10_one_thing: value('q10')
    };
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    statusEl.textContent = '';

    let firstInvalid = null;
    const identityIsValid = identityValid();
    if (!identityIsValid) firstInvalid = identityCard;

    requiredQuestions.forEach(function (question) {
      const isValid = answered(question);
      question.classList.toggle('invalid', !isValid);
      if (!isValid && !firstInvalid) firstInvalid = question;
    });

    const q7Count = form.querySelectorAll('input[name="q7"]:checked').length;
    const q7Other = document.getElementById('q7Other').value.trim();
    const q7 = form.querySelector('[data-q="7"]');
    if ((q7Count === 0 && !q7Other) || q7Count > 2) {
      q7.classList.add('invalid');
      if (!firstInvalid) firstInvalid = q7;
    }

    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      statusEl.textContent = 'Lütfen işaretli alanları tamamlayın.';
      return;
    }

    submitButton.disabled = true;
    submitButton.innerHTML = 'Gönderiliyor…';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collectPayload())
      });
      if (!response.ok) throw new Error('Anket gönderilemedi');

      if (typeof gtag === 'function') gtag('event', 'penz_user_survey_submit');
      if (typeof ym === 'function') ym(111467088, 'reachGoal', 'user_survey_submit');

      form.hidden = true;
      document.querySelector('.survey-meta').hidden = true;
      document.querySelector('.survey-progress').hidden = true;
      successEl.hidden = false;
      successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (error) {
      statusEl.textContent = 'Yanıtınız şu anda gönderilemedi. Lütfen kısa süre sonra tekrar deneyin.';
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Anketi Gönder <span>→</span>';
    }
  });

  updateProgress();
})();
