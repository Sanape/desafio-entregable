let data;

const profile = document.getElementById("profile");
const logoutButton = document.getElementById("logoutButton");

logoutButton.onclick = async (e) => {
  e.preventDefault();
  await logout();
};

async function getData() {
  try {
    const result = await fetch(`http://localhost:8080/api/sessions/current`, {
      method: "GET",
    });

    const resultJson = await result.json();

    if (resultJson) {
      data = resultJson.message;
    }
  } catch (err) {
    alert(`ERROR: ${err}`);
  }
}

async function compileProfile() {
  await getData();
  let first_name = document.getElementById("first_name");
  let last_name = document.getElementById("last_name");
  let age = document.getElementById("age");
  first_name.value = data.first_name;
  last_name.value = data.last_name ? data.last_name : "";
  age.value = data.age;
  const profileTemplate = `<li>
      <p>ID: ${data._id}</p> 
      <p>Email: ${data.email}</p> 
    </li>`;
  profile.innerHTML = profileTemplate;
}

compileProfile();

async function logout() {
  try {
    const result = await fetch(`http://localhost:8080/api/sessions`, {
      method: "DELETE",
    });

    if (result) {
      localStorage.clear();
      location.reload();
    }
  } catch (err) {
    alert(`ERROR: ${err}`);
  }
}

const profileForm = document.getElementById("profileForm");

profileForm.onsubmit = async (e) => {
  e.preventDefault();
  let newData = {
    first_name: document.getElementById("first_name").value,
    last_name: document.getElementById("last_name").value,
    age: document.getElementById("age").value,
  };

  await updateUser(newData);
};

async function updateUser(newData) {
  try {
    validateUserForm(newData);

    const result = await fetch("http://localhost:8080/api/users/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    const resultJson = await result.json();

    if (result) {
      alert("User updated succesfully");
    }
  } catch (err) {
    alert(`ERROR: ${err}`);
  }
}

function validateUserForm(newUser) {
  if (
    !newUser.first_name ||
    !newUser.last_name ||
    newUser.age === 0 ||
    !newUser.age
  ) {
    throw new Error("Form incomplete");
  }
}
