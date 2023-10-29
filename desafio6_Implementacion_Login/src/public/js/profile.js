let data = JSON.parse(localStorage.getItem('user'));

const profile = document.getElementById('profile');
const logoutButton = document.getElementById('logoutButton');

logoutButton.onclick = async (e) => {
  e.preventDefault();
  await logout();
};

function compileProfile() {
  const profileTemplate = `<li>
      <p>ID: ${data._id}</p> 
      <p>Email: ${data.email}</p> 
      <p>First name: ${data.first_name}</p> 
      <p>Last name: ${data.last_name}</p> 
      <p>Age: ${data.age}</p>
    </li>`;
  profile.innerHTML = profileTemplate;
}

compileProfile();

async function logout() {
  try {
    const result = await fetch(`http://localhost:8080/api/sessions`, {
      method: 'DELETE',
    });

    if (result) {
      localStorage.clear();
      location.reload();
    }
  } catch (err) {
    alert(`ERROR: ${err}`);
  }
}
