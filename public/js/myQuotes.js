const form = document.querySelector('form')
const author = form.author
const text = form.text

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const res = await fetch('/quotes/addQuote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      author: author.value,
      text: text.value,
    }),
  })

  const message = await res.json()

  location.reload()
})

document.addEventListener('click', async (e) => {
  if (e.target.dataset.type === 'add') {
    let data = await fetch('/quotes/' + e.target.dataset.id, { method: 'PUT' })
    location.reload()
  }
  if (e.target.dataset.type === 'delete') {
    let data = await fetch('/quotes/' + e.target.dataset.id, {
      method: 'DELETE',
    })
    location.reload()
  }
  if (e.target.dataset.show) {
    let addForm = document.querySelector('.add-quote')
    addForm.classList.add('hide')
  }
})
