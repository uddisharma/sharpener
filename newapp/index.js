const API_URL = "http://localhost:3000/shop";

async function getTasks() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function addTask(product, price) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product,
        price,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function editTask(id, product, price) {
  document.getElementById("id").value = id;
  document.getElementById("editContainer").style.display = "block";
  document.getElementById("updatedproduct").value = product;
  document.getElementById("updatedprice").value = price;
}
async function updateTask(id, product, price) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product,
        price,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// display tasks in the table
async function displayTasks() {
  const tasks = await getTasks();
  const taskTable = document.getElementById("taskTable");
  taskTable.innerHTML = "";
  tasks.forEach((task) => {
    const row = document.createElement("tr");
    row.innerHTML = `
   
      <td>${task.product}</td>
      <td>${task.price}</td>
      
      <td>
        <button type
        ="button" onclick="editTask(${task.id}, '${task.product}', '${task.price}')">Edit</button>
        <button type="button" onclick="deleteTask(${task.id})">Delete</button>
        </td>
        `;
    taskTable.appendChild(row);
  });
}

displayTasks();
