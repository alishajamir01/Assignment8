$(document).ready(function () {
    const TASK_KEY = 'tasks';
  
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem(TASK_KEY)) || [];
      $('#taskList').empty();
      tasks.forEach((task, index) => {
        $('#taskList').append(createTaskElement(task, index));
      });
    }
  
    function saveTasks(tasks) {
      localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
    }
  
    function createTaskElement(taskText, index) {
      return `
        <div class="task" data-index="${index}">
          <span class="task-text">${taskText}</span>
          <div class="actions">
            <button class="btn btn-sm btn-warning edit-btn">Edit</button>
            <button class="btn btn-sm btn-danger delete-btn">Delete</button>
          </div>
        </div>
      `;
    }
  
    $('#addTaskBtn').click(function () {
      const task = $('#taskInput').val().trim();
      if (!task) return;
      const tasks = JSON.parse(localStorage.getItem(TASK_KEY)) || [];
      tasks.push(task);
      saveTasks(tasks);
      loadTasks();
      $('#taskInput').val('');
    });
  
    $('#taskList').on('click', '.delete-btn', function () {
      const index = $(this).closest('.task').data('index');
      const tasks = JSON.parse(localStorage.getItem(TASK_KEY)) || [];
      tasks.splice(index, 1);
      saveTasks(tasks);
      loadTasks();
    });
  
    $('#taskList').on('click', '.edit-btn', function () {
      const taskDiv = $(this).closest('.task');
      const index = taskDiv.data('index');
      const currentText = taskDiv.find('.task-text').text();
      const newText = prompt('Edit task:', currentText);
      if (newText !== null && newText.trim() !== '') {
        const tasks = JSON.parse(localStorage.getItem(TASK_KEY)) || [];
        tasks[index] = newText.trim();
        saveTasks(tasks);
        loadTasks();
      }
    });
  
    // Initial load
    loadTasks();
  });
  