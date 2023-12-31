const userInfo = JSON.parse(Cookies.get("user"));
const updateProfileForm = document.getElementById("updateProfileForm");
const profilePhoto = document.getElementById("profilePhoto");
profilePhoto.src = userInfo.profilePhoto;
const inputProfilePhoto = document.getElementById("inputProfilePhoto");
const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const role = document.getElementById("role");
const deleteAccountDialogButton = document.getElementById(
  "deleteAccountDialogButton"
);
const profileDialog = document.getElementById("profileDialog");
const cancelDeleteButton = document.getElementById("cancelDeleteButton");
const deleteButton = document.getElementById("deleteButton");

deleteAccountDialogButton.onclick = (e) => {
  e.preventDefault();
  profileDialog.showModal();
};

cancelDeleteButton.onclick = (e) => {
  e.preventDefault();
  profileDialog.close();
};

deleteButton.onclick = async (e) => {
  e.preventDefault();
  await deleteCurrentUser();
};

first_name.value = userInfo.firstName;
last_name.value = userInfo.lastName;
role.innerText = `Role: ${userInfo.role}`;

inputProfilePhoto.onchange = (e) => {
  e.preventDefault();
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const newUserInfo = new FormData();

      newUserInfo.append("image", file);

      profilePhoto.src = e.target.result;

      await updateUser(newUserInfo);
    };
    reader.readAsDataURL(file);
  }
};

async function getCurrentUser() {
  try {
    const result = await axios.get(
      `http://localhost:8080/api/sessions/current`
    );

    Cookies.remove("user");
    Cookies.set("user", JSON.stringify(result.data.message));
    window.location.reload();
  } catch (err) {
    if (err.response) {
      alert(`${err.response.data.Error}`);
    } else {
      alert(err);
    }
  }
}

updateProfileForm.onsubmit = async (e) => {
  try {
    e.preventDefault();
    let newData = {
      first_name: document.getElementById("first_name").value,
      last_name: document.getElementById("last_name").value,
    };

    validateUserForm(newData);

    await updateUser(newData);
  } catch (error) {
    alert(error);
  }
};

async function updateUser(newData) {
  try {
    if (Cookies.get("token")) {
      await axios.put("http://localhost:8080/api/users/", newData, {
        headers: {
          Authorization: Cookies.get("token"),
        },
      });
    } else {
      await axios.put("http://localhost:8080/api/users/", newData);
    }

    await getCurrentUser();
  } catch (err) {
    if (err.response) {
      alert(`${err.response.data.Error}`);
    } else {
      alert(err);
    }
  }
}

async function deleteCurrentUser() {
  try {
    if (Cookies.get("token")) {
      await axios.delete("http://localhost:8080/api/users/", {
        headers: {
          Authorization: Cookies.get("token"),
        },
      });
    } else {
      await axios.delete("http://localhost:8080/api/users/");
    }

    Cookies.remove("token");
    Cookies.remove("user");

    location.href = "http://localhost:8080/";
  } catch (err) {
    if (err.response) {
      alert(`${err.response.data.Error}`);
    } else {
      alert(err);
    }
  }
}

function validateUserForm(newUser) {
  if (!newUser.first_name || !newUser.last_name) {
    throw new Error("Form incomplete");
  }
}
