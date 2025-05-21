// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.setAttribute('data-theme', 
        document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
    themeToggle.innerHTML = document.body.getAttribute('data-theme') === 'dark' 
        ? '<i class="fas fa-sun"></i> Light Mode' 
        : '<i class="fas fa-moon"></i> Dark Mode';
});

// ===== Animated Counter =====
let count = 0;
const counter = document.querySelector('.counter');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const resetCounterBtn = document.getElementById('resetCounterBtn');

const updateCounter = () => {
    counter.textContent = count;
    counter.style.transform = 'scale(1.1)';
    setTimeout(() => counter.style.transform = 'scale(1)', 200);
};

incrementBtn.addEventListener('click', () => {
    count++;
    updateCounter();
});

decrementBtn.addEventListener('click', () => {
    if (count > 0) count--;
    updateCounter();
});

resetCounterBtn.addEventListener('click', () => {
    count = 0;
    updateCounter();
});

// ===== Drag & Drop Zone =====
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');

dropZone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
        fileList.innerHTML = files.map(file => 
            `<div class="file-item">📄 ${file.name}</div>`
        ).join('');
    }
});

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
    dropZone.addEventListener(event, (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
});

['dragenter', 'dragover'].forEach(event => {
    dropZone.addEventListener(event, () => {
        dropZone.style.background = 'rgba(74, 111, 165, 0.2)';
    });
});

['dragleave', 'drop'].forEach(event => {
    dropZone.addEventListener(event, () => {
        dropZone.style.background = '';
    });
});

dropZone.addEventListener('drop', (e) => {
    fileInput.files = e.dataTransfer.files;
    fileInput.dispatchEvent(new Event('change'));
});

// ===== To-Do List =====
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

const addTodo = () => {
    if (todoInput.value.trim()) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todoInput.value}</span>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;
        todoList.appendChild(li);
        todoInput.value = '';
        
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.classList.add('fade-out');
            setTimeout(() => li.remove(), 300);
        });
    }
};

addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

// ===== Form Validation =====
const signupForm = document.getElementById('signupForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

username.addEventListener('input', () => {
    if (username.value.length < 3) {
        usernameError.textContent = 'Username must be at least 3 characters';
    } else {
        usernameError.textContent = '';
    }
});

email.addEventListener('input', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        emailError.textContent = 'Please enter a valid email';
    } else {
        emailError.textContent = '';
    }
});

password.addEventListener('input', () => {
    if (password.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
    } else {
        passwordError.textContent = '';
    }
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!usernameError.textContent && !emailError.textContent && !passwordError.textContent) {
        alert('Form submitted successfully!');
        signupForm.reset();
    }
});