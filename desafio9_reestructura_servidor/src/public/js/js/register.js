const registerForm = document.getElementById("registerForm");

registerForm.onsubmit = async (e) => {
  e.preventDefault();
  let newUser = {
    email: document.getElementById("email").value,
    first_name: document.getElementById("first_name").value,
    last_name: document.getElementById("last_name").value,
    age: document.getElementById("age").value,
    password: document.getElementById("password").value,
  };

  await register(newUser);
};

async function register(newUser) {
  try {
    validateUserForm(newUser);

    const result = await fetch("http://localhost:8080/api/sessions/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (result) {
      location.replace("http://localhost:8080/login");
    }
  } catch (err) {
    alert(`ERROR: ${err}`);
  }
}

function validateUserForm(newUser) {
  if (
    !newUser.email ||
    !newUser.password ||
    !newUser.first_name ||
    !newUser.last_name ||
    !newUser.age
  ) {
    throw new Error("Form incomplete");
  }
}
