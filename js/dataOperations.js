document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission for now
    
    const taskInput = document.getElementById('taskInput').value.trim();
    const descriptionInput = document.getElementById('descriptionInput').value.trim();
    
    if (!taskInput) {
      alert('Task name/title is required and should be a string.');
      return;
    }
  
    if (descriptionInput && typeof descriptionInput !== 'string') {
      alert('Description should be a string.');
      return;
    }
    
    // Create data object with taskInput and descriptionInput
    const data = {
      job: taskInput,
      description: descriptionInput
    };
  
    // Make a POST request using fetch()
    fetch('http://localhost:3000/createData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(result => {
      // Handle the result after successful response if needed
      console.log('Data sent successfully:', result);
      // Perform additional actions after successful data submission
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      // Handle errors if any
    });
  
    // Clear the form inputs after successful submission (optional)
    document.getElementById('taskInput').value = '';
    document.getElementById('descriptionInput').value = '';
  });
  
  document.addEventListener('DOMContentLoaded', fetchDataAndDisplayTasks);

  function fetchDataAndDisplayTasks() {
    fetch('http://localhost:3000/readData')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(data => {
        // Get the task list element
        const taskListElement = document.getElementById('taskList');
  
        // Clear existing task list items
        taskListElement.innerHTML = '';
  
        if (data && Array.isArray(data.data)) {
          // Loop through the fetched tasks and create list items
          data.data.forEach(task => {
            // Create task item element
            const listItem = document.createElement('li');
            listItem.textContent = `${task.job}: ${task.description}`;
  
            // Create container for icons (edit and delete)
            const iconsContainer = document.createElement('div');
            iconsContainer.classList.add('icons-container');
  
            // Create edit icon element
            const editIcon = document.createElement('i');
            editIcon.classList.add('fas', 'fa-edit', 'edit-icon');
            editIcon.addEventListener('click', () => updateTask(task)); // Attach updateTask() with task data to the click event
  
            // Create delete icon element
            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fas', 'fa-trash', 'delete-icon');
            deleteIcon.addEventListener('click', () => deleteTask(task)); // Attach deleteTask() with task data to the click event
  
            // Append icons to the container
            iconsContainer.appendChild(editIcon);
            iconsContainer.appendChild(deleteIcon);
  
            // Append the icons container to the task item
            listItem.appendChild(iconsContainer);
  
            // Append the task item to the task list
            taskListElement.appendChild(listItem);
          });
        } else {
          console.error('Data received from the server is not in the expected format.');
          // Handle the data format issue as needed
        }
      })
      .catch(error => {
        console.error('There was a problem fetching the data:', error);
        // Handle errors if any
      });
  }
  
  function updateTask(task) {
    // Implement update task functionality here using the task data (e.g., task._id, task.job, task.description)
    console.log('Update task clicked:', task);
    // You can access task details and perform the update operation accordingly
  }
  
  // to delete task
  function deleteTask(task) {
    const taskId = task._id; // Assuming _id is the property containing the task ID
  
    fetch(`http://localhost:3000/deleteData/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
        // You can add other headers if required
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      console.log('Task deleted successfully:', taskId);
      // Perform any other operations after successful deletion
    })
    .catch(error => {
      console.error('There was a problem deleting the task:', error);
      // Handle errors if any
    });
  }
  
  