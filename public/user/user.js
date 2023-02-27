let welcome = document.getElementById('welcome-message');
welcome.innerText = `Welcome ${sessionStorage.getItem('user')}`;

