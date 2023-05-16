const todoForm = document.querySelector('.todo__wrapper');
const nameInput = document.querySelector('#todo-name');
const descrInput = document.querySelector('#todo-descr');
const tasksList = document.querySelector('.todo__list');

let tasks = [];

const renderTask = (task) => {
  const isCheckedTask = task.done ? 'checked' : null;

  const taskHTML = `
    <label class="checkbox" id="${task?.id}">
      <input type="checkbox" class="checkbox__input visually-hidden" ${isCheckedTask}>
      <div class="checkbox__custom"></div>
      <span class="checkbox__name">${task.name}</span>
      <span class="checkbox__descr">${task.descr}</span>
      <button class="checkbox__delete" type="button" aria-label="Delete task" title="Delete">
        <svg width="24" height="24">
          <use xlink:href="./img/sprites/sprite-noattr.svg#delete"></use>
        </svg>
      </button>
    </label>
  `;

  tasksList.insertAdjacentHTML('beforeend', taskHTML);
};

const saveToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach(task => renderTask(task));
}

todoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const newTask = {
    id: Date.now(),
    name: nameInput.value,
    descr: descrInput.value,
    done: false
  };

  tasks.push(newTask);
  saveToLocalStorage();

  renderTask(newTask);

  nameInput.value = '';
  descrInput.value = '';
  nameInput.focus();
});

todoForm.addEventListener('input', (evt) => {
  const parentNode = evt.target.closest('.checkbox');
  if (parentNode) {
    const task = tasks.find((item) => item.id === Number(parentNode.id));
    task.done = !task?.done;

    saveToLocalStorage();
  }
});

tasksList.addEventListener('click', (evt) => {
  if (evt.target.closest('.checkbox__delete') || evt.target.classList.contains('checkbox__delete')) {
    const parentNode = evt.target.closest('.checkbox');
    tasks = tasks.filter((task) => task.id !== Number(parentNode.id));
    saveToLocalStorage();

    parentNode.remove();
  }
});
