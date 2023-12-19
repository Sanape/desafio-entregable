const loginForm = document.getElementById("loginForm");

loginForm.onsubmit = async (e) => {
  e.preventDefault();
  let user = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  await login(user);
};

async function login(user) {
  try {
    validateUserForm(user);

    const result = await fetch("http://localhost:8080/api/sessions/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const resultJson = await result.json();

    if (result) {
      localStorage.setItem("user", JSON.stringify(resultJson.message));
      location.replace("http://localhost:8080/products");
    }
  } catch (err) {
    console.log(err)
    // alert(`ERROR: ${err}`);
  }
}

function validateUserForm(user) {
  if (!user.email || !user.password) {
    throw new Error("Form incomplete");
  }
}
