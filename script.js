document.addEventListener('DOMContentLoaded', () => {
    loadItems();
});
  
function addItem() {
    const newItemInput = document.getElementById('newItem');
    const prioritySelect = document.getElementById('priority');
    const imageURLInput = document.getElementById('imageURL');

    const newItem = newItemInput.value.trim();
    const priority = prioritySelect.value;
    const imageURL = imageURLInput.value.trim();

    if (newItem !== '') {
        const todoList = document.getElementById('todoList');

        const li = document.createElement('li');
        li.className = `${priority.toLowerCase()}-priority`; 
        li.innerHTML = `
            <input type="checkbox" onchange="toggleComplete(this)">
            <img src="${imageURL}" alt="Item Image">
            <span>${newItem}</span>
            <span>Priority: ${priority}</span>
            <button onclick="editItem(this)">Edit</button>
            <button onclick="deleteItem(this)">Delete</button>
            
            <!-- Formulario de edición oculto -->
            <form class="edit-form" style="display: none;">
                <input type="text" placeholder="Edit item..." class="edit-item">
                
                <select class="edit-priority">
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>

                <input type="url" placeholder="Edit Image URL..." class="edit-imageURL">
                <button onclick="saveEdit(this)">Save</button>
            </form>
        `;

        todoList.appendChild(li);

        saveItem(newItem, priority, imageURL);

        // Clear input fieldsss
        newItemInput.value = '';
        prioritySelect.value = 'low';
        imageURLInput.value = '';
    }
}
  
function editItem(button) {
    const li = button.parentNode;
    const span = li.querySelector('span');
    const newTask = prompt('Edit task:', span.textContent);
  
    if (newTask !== null) {
      span.textContent = newTask;
      updateLocalStorage();
    }
}
  
function deleteItem(button) {
    const li = button.parentNode;
    li.remove();
    updateLocalStorage();
}
  
function saveItem(item, priority, imageURL) {
    let items = JSON.parse(localStorage.getItem('items')) || [];

    items.push({ item, priority, imageURL });

    localStorage.setItem('items', JSON.stringify(items));
}
  
function loadItems() {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    const todoList = document.getElementById('todoList');

    items.forEach(({ item, priority, imageURL }) => {
        const li = document.createElement('li');
        li.className = `${priority.toLowerCase()}-priority`; 
        li.innerHTML = `
            <input type="checkbox" onchange="toggleComplete(this)">
            <img src="${imageURL}" alt="Item Image">
            <span>${item}</span>
            <span>Priority: ${priority}</span>
            <button onclick="editItem(this)">Edit</button>
            <button onclick="deleteItem(this)">Delete</button>
            
            <!-- Formulario de edición oculto -->
            <form class="edit-form" style="display: none;">
                <input type="text" placeholder="Edit item..." class="edit-item">
                <select class="edit-priority">
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
                <input type="url" placeholder="Edit Image URL..." class="edit-imageURL">
                <button onclick="saveEdit(this)">Save</button>
            </form>
        `;

        todoList.appendChild(li);
    });
}


  
function updateLocalStorage() {
    const todoList = document.getElementById('todoList');
    const items = [];
  
    todoList.querySelectorAll('li').forEach((li) => {
      const span = li.querySelector('span');
      const prioritySpan = li.querySelector('span:nth-child(3)');
      const img = li.querySelector('img');
      
      items.push({
        item: span.textContent,
        priority: prioritySpan.textContent.replace('Priority: ', ''),
        imageURL: img.src,
      });
    });
  
    localStorage.setItem('items', JSON.stringify(items));
}
// Agrega la función toggleComplete para marcar/desmarcar como completada
function toggleComplete(checkbox) {
    const li = checkbox.parentNode;
    li.classList.toggle('completed'); 
    updateLocalStorage();
}


function editItem(button) {
    const li = button.parentNode;
    const span = li.querySelector('span');
    const prioritySpan = li.querySelector('span:nth-child(3)'); 
    const editForm = li.querySelector('.edit-form');
    const editItemInput = editForm.querySelector('.edit-item');
    const editPrioritySelect = editForm.querySelector('.edit-priority');
    const editImageURLInput = editForm.querySelector('.edit-imageURL');

    // Rellena el formulario con la información actual
    editItemInput.value = span.textContent.trim();
    editPrioritySelect.value = li.classList[0].replace('-priority', ''); 
    editImageURLInput.value = li.querySelector('img').src;

    // Muestra el formulario y oculta el contenido original
    span.style.display = 'none';
    prioritySpan.style.display = 'none'; 
    editForm.style.display = 'flex';
}

function saveEdit(button) {
    const li = button.parentNode.parentNode;
    const span = li.querySelector('span');
    const prioritySpan = li.querySelector('span:nth-child(3)'); 
    const editForm = li.querySelector('.edit-form');
    const editItemInput = editForm.querySelector('.edit-item');
    const editPrioritySelect = editForm.querySelector('.edit-priority');
    const editImageURLInput = editForm.querySelector('.edit-imageURL');

    // Actualiza la información con los valores editados
    span.textContent = editItemInput.value.trim();
    prioritySpan.textContent = `Priority: ${editPrioritySelect.value.charAt(0).toUpperCase() + editPrioritySelect.value.slice(1)}`;
    li.className = `${editPrioritySelect.value.toLowerCase()}-priority`;
    li.querySelector('img').src = editImageURLInput.value.trim();

    // Muestra el contenido original y oculta el formulario
    span.style.display = 'flex';
    prioritySpan.style.display = 'inline';
    editForm.style.display = 'none';

    // Actualiza el almacenamiento local
    updateLocalStorage();
}

