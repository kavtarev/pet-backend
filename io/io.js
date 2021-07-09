module.exports = (socket) => {
  var properties = socket.handshake.headers.cookie.split(' ')
  var obj = {}
  properties.forEach(function (property) {
    var tup = property.split('=')
    obj[tup[0]] = tup[1]
  })
  console.log(obj['JWT'])
}
