let form = document.querySelector('form')
let login = form.name
let password = form.password
let email = form.email
let nameError = document.querySelector('.name ')
let passwordError = document.querySelector('.password ')
let emailError = document.querySelector('.email ')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  nameError.textContent = ''
  passwordError.textContent = ''
  email.textContent = ''
  let data = await fetch('/register', {
    method: 'POST',
    body: JSON.stringify({
      name: login.value,
      password: password.value,
      email: email.value,
    }),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
  let result = await data.json()
  console.log(result)
  if (!result._id) {
    nameError.textContent = result.name
    passwordError.textContent = result.password
    emailError.textContent = result.email
  } else {
    location.replace('/')
  }
})
