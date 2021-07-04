const crypto = require('crypto')
const data = 'mom'
const pop = crypto.createHash('sha256').update(data).digest('hex')
console.log(pop)

function sum(n) {
  let total = n
  function f(b) {
    total += b
    console.log(total)
    return f
  }
  console.log(total)
  return f
}

sum(5)(3)(34)
