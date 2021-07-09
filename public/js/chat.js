var socket = io()
const form = document.querySelector('form')
const chatMessages = document.querySelector('.chat-messages')
const input = form.message

form.addEventListener('submit', (e) => {
  e.preventDefault()
  socket.emit('chat-message', { message: input.value, date: new Date() })
  input.value = ''
  input.focus()
})

socket.on('chat-message', (data) => {
  chatMessages.insertAdjacentHTML(
    'beforeend',
    `<div class="message">
    <div class="message-info">
      <span><b>${data.user}</b> ${data.date.slice(11, 19)}</span>
    </div>
    <div class="message-text">
      ${data.message}
    </div>
  </div>
  `
  )
  chatMessages.scrollTop += 400
})
