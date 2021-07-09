function getJWT(socket) {
  let properties = socket.handshake.headers.cookie.split(' ')
  let obj = {}
  for (let i = 0; i < properties.length; i++) {
    let temp = properties[i].split('=')
    obj[temp[0]] = temp[1]
  }

  return obj.JWT
}

module.exports = { getJWT }
