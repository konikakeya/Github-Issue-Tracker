let signin = () => {
  let username = document.getElementById('username').value.trim();
  console.log(username);

  let pass = document.getElementById('password').value.trim();
  console.log(pass);

  if (username === 'admin' && pass === 'admin123') {
    alert('You Signed In Successfully');
    window.location.href = 'main.html';
  } else {
    alert('Username or Password is incorrect');
  }
}