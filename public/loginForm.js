let form = document.querySelector('form')
let email = form.email
let password = form.password
let emailError = document.querySelector('.email ')
let passwordError = document.querySelector('.password ')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  emailError.textContent = ''
  passwordError.textContent = ''
  let data = await fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ email: email.value, password: password.value }),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
  let result = await data.json()
  if (!result.id) {
    emailError.textContent = result.email
    passwordError.textContent = result.password
  } else {
    location.replace('/')
  }
})
