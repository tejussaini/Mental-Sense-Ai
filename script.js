const $ = id => document.getElementById(id);
const OPTIONS = {
  gender: ['Male', 'Female'],
  academic_level: ['High School', 'Undergraduate', 'Graduate'],
  purpose: ['Education', 'Networking', 'Entertainment', 'News'],
  stress: ['Low', 'Medium', 'High', 'Very High']
};
const DEFAULTS = {gender: 'Female', academic_level: 'Undergraduate', purpose: 'Entertainment', stress: 'Medium'};
const PLATFORMS = ['Instagram','TikTok','YouTube','WhatsApp','Facebook','Snapchat','Twitter','LinkedIn','LINE','KakaoTalk','VKontakte','WeChat'];
const COUNTRIES = ['India','USA','Canada','Australia','UK','Germany','Mexico','Turkey','France','Other'];

// Build chip groups, platform select and country suggestions
document.querySelectorAll('.chips').forEach(box => {
  const name = box.dataset.name;
  OPTIONS[name].forEach(v => {
    const l = document.createElement('label');
    l.className = 'chip';
    l.innerHTML = `<input type="radio" name="${name}" value="${v}" ${v === DEFAULTS[name] ? 'checked' : ''}><span>${v}</span>`;
    box.appendChild(l);
  });
});
$('platform').innerHTML = PLATFORMS.map(p => `<option>${p}</option>`).join('');
$('countries').innerHTML = COUNTRIES.map(c => `<option value="${c}">`).join('');

// Live slider values
[['usage','o-usage'],['study','o-study'],['sleep','o-sleep'],['activity','o-activity']].forEach(([i, o]) => {
  const sync = () => $(o).textContent = `${$(i).value} h`;
  $(i).addEventListener('input', sync); sync();
});

const radio = name => document.querySelector(`input[name="${name}"]:checked`).value;

// Same field names the FastAPI StudentData model expects
function payload() {
  return {
    age: +$('age').value,
    gender: radio('gender'),
    country: $('country').value.trim() || 'Other',
    academic_level: radio('academic_level'),
    most_used_platform: $('platform').value,
    purpose_of_use: radio('purpose'),
    avg_daily_usage_hours: +$('usage').value,
    daily_unlocks: +$('unlocks').value,
    study_hours: +$('study').value,
    physical_activity_hours: +$('activity').value,
    sleep_hours_per_night: +$('sleep').value,
    stress_level: radio('stress')
  };
}

// Rough offline stand-in so the UI can be previewed without the server
function demoScore(d) {
  const stress = {Low: 0.8, Medium: 0, High: -0.9, 'Very High': -1.6}[d.stress_level];
  const s = 7.6 - 0.35 * d.avg_daily_usage_hours + 0.3 * Math.min(d.sleep_hours_per_night - 6, 3)
          + 0.15 * Math.min(d.physical_activity_hours, 3) - 0.003 * d.daily_unlocks + stress;
  return Math.max(2, Math.min(9.5, +s.toFixed(2)));
}

async function predict(d) {
  if (!$('demo').checked) {
    try {
      const res = await fetch($('api').value.replace(/\/$/, '') + '/predict', {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(d)
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(Array.isArray(e.detail) ? e.detail.map(x => `${x.loc.slice(-1)}: ${x.msg}`).join('; ') : 'The server rejected the request.');
      }
      return {score: (await res.json()).predicted_mental_health_score, demo: false};
    } catch (err) {
      if (err instanceof TypeError) { // network failure → fall back to demo
        return {score: demoScore(d), demo: true};
      }
      throw err;
    }
  }
  return {score: demoScore(d), demo: true};
}

function show(score, demo) {
  const band = score >= 7 ? ['Healthy range', 'Habits look balanced. Keep sleep and activity steady.', 'var(--good)']
             : score >= 5 ? ['Worth watching', 'Some habits may be weighing on wellbeing. Small changes to sleep or usage could help.', 'var(--mid)']
             : ['Needs attention', 'Heavy usage and stress are pulling the score down. Consider talking to someone you trust.', 'var(--low)'];
  $('score').textContent = score.toFixed(2);
  $('verdict').textContent = band[0];
  $('note').textContent = band[1] + (demo ? ' (Demo estimate, not from the model.)' : '');
  $('note').classList.remove('error');
  const arc = $('arc');
  arc.style.stroke = band[2];
  arc.setAttribute('stroke-dasharray', `${Math.max(0, Math.min(10, score)) * 10} 100`);
}

$('form').addEventListener('submit', async e => {
  e.preventDefault();
  const d = payload(), btn = $('submit');
  if (!d.age || d.age < 10 || d.age > 100) return fail('Enter an age between 10 and 100.');
  if (d.study_hours + d.sleep_hours_per_night + d.physical_activity_hours > 24) return fail('Study, sleep and activity add up to more than 24 hours.');
  btn.disabled = true; btn.textContent = 'Predicting…';
  try {
    const r = await predict(d);
    show(r.score, r.demo);
  } catch (err) { fail(err.message); }
  btn.disabled = false; btn.textContent = 'Predict score';
});

function fail(msg) {
  $('verdict').textContent = 'Could not predict';
  $('note').textContent = msg;
  $('note').classList.add('error');
}
