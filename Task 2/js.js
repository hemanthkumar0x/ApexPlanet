// Contact Form Validation
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('successMsg');

const showError = (field, msg) => {
  const el = document.querySelector(`.error[data-for="${field}"]`);
  if (el) el.textContent = msg;
};
const clearErrors = () => document.querySelectorAll('.error').forEach(e => e.textContent = '');
const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

form.addEventListener('submit', e => {
  e.preventDefault();
  clearErrors();
  let ok = true;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  if (!name) { showError('name','Name is required.'); ok = false; }
  if (!email) {
    showError('email','Email is required.'); ok = false;
  } else if (!isValidEmail(email)) {
    showError('email','Invalid email format.'); ok = false;
  }
  if (!message) { showError('message','Message is required.'); ok = false; }

  if (!ok) return;
  successMsg.style.display = 'inline-block';
  form.reset();
  setTimeout(()=>{ successMsg.style.display='none'; }, 2500);
});

// Tab Switcher
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      activateTab(tab);
    }
  });
});
function activateTab(tab) {
  tabs.forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected','false');
  });
  tab.classList.add('active');
  tab.setAttribute('aria-selected','true');
  const target = tab.dataset.target;
  document.querySelectorAll('.panel').forEach(p => p.style.display='none');
  document.getElementById(target).style.display='block';
}

// To-Do List
const addBtn = document.getElementById('addTaskBtn');
const newTaskInput = document.getElementById('newTask');
const tasksList = document.getElementById('tasksList');
const noTasks = document.getElementById('noTasks');

function updateNoTasks() {
  noTasks.style.display = tasksList.children.length === 0 ? 'block' : 'none';
}
function createTask(text) {
  const li = document.createElement('li');
  li.className = 'task';
  const span = document.createElement('span');
  span.textContent = text;
  const remove = document.createElement('button');
  remove.className = 'remove-btn';
  remove.innerHTML = '&times;';
  remove.addEventListener('click', () => {
    li.remove();
    updateNoTasks();
  });
  li.append(span, remove);
  return li;
}
addBtn.addEventListener('click', () => {
  const val = newTaskInput.value.trim();
  if (!val) return;
  tasksList.appendChild(createTask(val));
  newTaskInput.value = '';
  updateNoTasks();
});
newTaskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addBtn.click();
});
updateNoTasks();

// Image Gallery
const imageUpload = document.getElementById('imageUpload');
const thumbsContainer = document.getElementById('thumbsContainer');
const noImages = document.getElementById('noImages');

function updateNoImages() {
  noImages.style.display = thumbsContainer.children.length === 0 ? 'block' : 'none';
}
function createThumb(file) {
  const url = URL.createObjectURL(file);
  const wrapper = document.createElement('div');
  wrapper.className = 'thumb';
  const img = document.createElement('img');
  img.src = url;
  img.alt = file.name;
  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove';
  removeBtn.textContent = '×';
  removeBtn.addEventListener('click', () => {
    wrapper.remove();
    updateNoImages();
    URL.revokeObjectURL(url);
  });
  wrapper.append(img, removeBtn);
  return wrapper;
}
imageUpload.addEventListener('change', e => {
  const files = Array.from(e.target.files);
  files.forEach(f => {
    if (!f.type.startsWith('image/')) return;
    thumbsContainer.appendChild(createThumb(f));
  });
  imageUpload.value = '';
  updateNoImages();
});
updateNoImages();
