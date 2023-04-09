let users = [];

function createUser() {
	const nameInput = document.getElementById('name');
	const emailInput = document.getElementById('email');
	const phoneInput = document.getElementById('phone');

	const user = {
		name: nameInput.value,
		email: emailInput.value,
		phone: phoneInput.value
	};

	users.push(user);

	saveUsers();

	renderUsers();
}

function readUsers() {
	const json = localStorage.getItem('users');
	users = JSON.parse(json) || [];
}

function saveUsers() {
	const json = JSON.stringify(users);
	localStorage.setItem('users', json);
}

function updateUsers(userIndex, updatedUser) {
	users[userIndex] = updatedUser;

	saveUsers();

	renderUsers();
}

function deleteUsers(userIndex) {
	users.splice(userIndex, 1);

	saveUsers();

	renderUsers();
}

function renderUsers() {
	const userList = document.getElementById('userList');
	userList.innerHTML = '';

	users.forEach((user, index) => {
		const li = document.createElement('li');
		const name = document.createElement('span');
		const email = document.createElement('span');
		const phone = document.createElement('span');
		const editButton = document.createElement('button');
		const deleteButton = document.createElement('button');

		name.innerText = user.name;
		email.innerText = user.email;
		phone.innerText = user.phone;

		editButton.innerText = 'Edit';
		editButton.onclick = () => editUser(index);
		deleteButton.innerText = 'Delete';
		deleteButton.onclick = () => deleteUsers(index);

		li.appendChild(name);
		li.appendChild(email);
		li.appendChild(phone);
		li.appendChild(editButton);
		li.appendChild(deleteButton);

		userList.appendChild(li);
	});
}

function editUser(userIndex) {
	const user = users[userIndex];

	const name = prompt('Enter name', user.name);
	const email = prompt('Enter email', user.email);
	const phone = prompt('Enter phone', user.phone);

	const updatedUser = {
		name,
		email,
		phone
	};

	updateUsers(userIndex, updatedUser);
}

readUsers();
renderUsers();

function renderUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
  
    axios.get('/users.json')
      .then(response => {
        const users = response.data;
  
        users.forEach((user, index) => {
          const li = document.createElement('li');
          const name = document.createElement('span');
          const email = document.createElement('span');
          const phone = document.createElement('span');
          const editButton = document.createElement('button');
          const deleteButton = document.createElement('button');
  
          name.innerText = user.name;
          email.innerText = user.email;
          phone.innerText = user.phone;
  
          editButton.innerText = 'Edit';
          editButton.onclick = () => editUser(index);
          deleteButton.innerText = 'Delete';
          deleteButton.onclick = () => deleteUsers(index);
  
          li.appendChild(name);
          li.appendChild(email);
          li.appendChild(phone);
          li.appendChild(editButton);
          li.appendChild(deleteButton);
  
          userList.appendChild(li);
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  const api = '/api/users/delete';


const deleteUser = async (userId) => {
  try {

    const response = await axios.delete(`${api}/${userId}`);
    

    if (response.status === 200) {
      console.log(`User with ID ${userId} deleted successfully`);
    } else {
      console.log(`Failed to delete user with ID ${userId}`);
    }
  } catch (error) {
    console.error(error);
  }
}


deleteUser(123);


const updateapi = '/api/users/update';


const updateUser = async (userId, userData) => {
  try {
   
    const response = await axios.put(`${updateapi}/${userId}`, userData);
    
  
    if (response.status === 200) {
      console.log(`User with ID ${userId} updated successfully`);
    } else {
      console.log(`Failed to update user with ID ${userId}`);
    }
  } catch (error) {
    console.error(error);
  }
}

const userData = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  age: 30
};
updateUser(123, userData);






