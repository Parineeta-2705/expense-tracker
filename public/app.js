const API = '/api/expenses';
const $ = (id) => document.getElementById(id);
const money = (n) => '₹' + Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const today = () => new Date().toISOString().slice(0, 10);

const form = $('expense-form');
let editingId = null;

async function api(url, options) {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

// READ
async function load() {
  const cat = $('filter').value;
  const [expenses, summary] = await Promise.all([
    api(cat ? `${API}?category=${encodeURIComponent(cat)}` : API),
    api(`${API}/summary`)
  ]);
  renderSummary(summary);
  renderList(expenses);
}

function renderSummary({ total, byCategory }) {
  $('total').textContent = money(total);
  $('breakdown').innerHTML = byCategory
    .map((c) => `<span class="chip">${c._id}: ${money(c.total)}</span>`).join('');
}

function renderList(expenses) {
  const list = $('list');
  if (!expenses.length) {
    list.innerHTML = '<li class="empty">No expenses yet. Add your first one on the left.</li>';
    return;
  }
  list.innerHTML = '';
  expenses.forEach((e) => {
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `
      <span class="name"></span><span class="amt">${money(e.amount)}</span>
      <span class="meta"></span>
      <span class="btns">
        <button class="small ghost" data-act="edit">Edit</button>
        <button class="small danger" data-act="delete">Delete</button>
      </span>`;
    li.querySelector('.name').textContent = e.title;           // textContent avoids HTML injection
    li.querySelector('.meta').textContent =
      `${e.category} · ${new Date(e.date).toLocaleDateString('en-IN')}` + (e.note ? ` · ${e.note}` : '');
    li.querySelector('[data-act=edit]').onclick = () => startEdit(e);
    li.querySelector('[data-act=delete]').onclick = () => remove(e._id);
    list.appendChild(li);
  });
}

// CREATE + UPDATE
form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  $('error').textContent = '';
  const body = JSON.stringify({
    title: $('title').value, amount: Number($('amount').value),
    category: $('category').value, date: $('date').value, note: $('note').value
  });
  try {
    if (editingId) await api(`${API}/${editingId}`, { method: 'PUT', body });
    else await api(API, { method: 'POST', body });
    resetForm();
    load();
  } catch (err) { $('error').textContent = err.message; }
});

function startEdit(e) {
  editingId = e._id;
  $('title').value = e.title; $('amount').value = e.amount; $('category').value = e.category;
  $('date').value = e.date.slice(0, 10); $('note').value = e.note || '';
  $('form-title').textContent = 'Edit expense';
  $('submit-btn').textContent = 'Update expense';
  $('cancel-btn').hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// DELETE
async function remove(id) {
  if (!confirm('Delete this expense?')) return;
  try { await api(`${API}/${id}`, { method: 'DELETE' }); load(); }
  catch (err) { alert(err.message); }
}

function resetForm() {
  editingId = null; form.reset(); $('date').value = today();
  $('form-title').textContent = 'Add an expense';
  $('submit-btn').textContent = 'Save expense';
  $('cancel-btn').hidden = true;
}

$('cancel-btn').onclick = resetForm;
$('filter').onchange = load;
resetForm();
load().catch((err) => ($('error').textContent = err.message));
