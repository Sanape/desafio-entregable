const resetPasswordForm = document.getElementById("resetPasswordForm");
const back = document.getElementById("back");
const url = window.location.href;
const token = url.replace("http://localhost:8080/resetPassword/", "");
const messagesSection = document.getElementById("messagesSection");

resetPasswordForm.onsubmit = async (e) => {
  e.preventDefault();
  let newPassword = {
    password: document.getElementById("password").value,
  };

  await resetPassword(newPassword);
};

async function resetPassword(password) {
  try {
    validateResetPasswordForm(password);

    const result = await axios.post(
      `http://localhost:8080/api/users/resetPassword/${token}`,
      password
    );

    messagesSection.innerHTML = result.data.message;
  } catch (err) {
    if(err.response){
      alert(`${err.response.data.Error}`);
    }else{
      alert(err)
    }
  }
}

function validateResetPasswordForm(passwordForm) {
  if (!passwordForm.password) {
    throw new Error("Form incomplete");
  }

  if (
    passwordForm.password != document.getElementById("confirm_password").value
  ) {
    throw new Error("Confirm password do not match");
  }

  if (!token) {
    throw new Error(
      "There is no token, go to http://localhost:8080/forgotPassword to sent an email to change your password"
    );
  }
}
