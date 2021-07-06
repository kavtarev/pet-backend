document.addEventListener('click', async (e) => {
  if (e.target.dataset.type === 'add') {
    let data = await fetch('/quotes/' + e.target.dataset.id, { method: 'PUT' })
  }
  if (e.target.dataset.type === 'delete') {
    let data = await fetch('/quotes/' + e.target.dataset.id, {
      method: 'DELETE',
    })
    location.reload()
  }
})
