document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('newTask');
    const addTaskBtn = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const li = document.createElement('li');
            
            const taskSpan = document.createElement('span');
            taskSpan.textContent = taskText;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '×';
            deleteBtn.className = 'delete-task';
            deleteBtn.addEventListener('click', function() {
                li.remove();
                saveTasks();
            });
            
            li.appendChild(taskSpan);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
            
            taskInput.value = '';
            saveTasks();
        }
    }
    
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li span').forEach(task => {
            tasks.push(task.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            JSON.parse(savedTasks).forEach(taskText => {
                const li = document.createElement('li');
                
                const taskSpan = document.createElement('span');
                taskSpan.textContent = taskText;
                
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '×';
                deleteBtn.className = 'delete-task';
                deleteBtn.addEventListener('click', function() {
                    li.remove();
                    saveTasks();
                });
                
                li.appendChild(taskSpan);
                li.appendChild(deleteBtn);
                taskList.appendChild(li);
            });
        }
    }
    
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Load tasks on startup
    loadTasks();
});