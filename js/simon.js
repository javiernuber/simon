const levels = 15
let keys = generateKeys(levels)

function nextLevel(currentLevel) {
  if (currentLevel == levels) {
    alert ("Winer!!")
  }
  alert(`Level: ${currentLevel + 1}`)
  for (let i = 0; i <= currentLevel; i++) {
    setTimeout(() => activate(keys[i]),
      1000 * (i+1))
  }

  let i = 0
  let currentKey = keys[i]
  window.addEventListener('keydown', onkeydown)
  function onkeydown(ev) {
    if (ev.keyCode == currentKey) {
      activate(currentKey, { success: true })
      i++
      if (i > currentLevel) {
        window.removeEventListener('keydown', onkeydown)
        setTimeout(() => nextLevel(i), 1500)
      }
      currentKey = keys[i]
    } else {
      activate(currentKey, { fail: true })
      window.removeEventListener('keydown', onkeydown)
      setTimeout(() => alert('You lost :('), 1000)
    }
  }
}

nextLevel(0)

function generateKeys(levels) {
  return new Array(levels).fill(0).map(generateRandomKey)
}

function generateRandomKey() {
  const min = 65
  const max = 90
  return Math.round(Math.random() * (max - min) + min)
}

function getElementByKeyCode(keyCode) {
  return document.querySelector(`[data-key="${keyCode}"]`)
}

function activate(keyCode, opts = {}) {
  const el = getElementByKeyCode(keyCode)
  el.classList.add('active')
  if (opts.success) {
    el.classList.add('success')
  } else if (opts.fail) {
    el.classList.add('fail')
  }
  setTimeout(() => desactivate(el), 500)
}

function desactivate(el) {
  el.className = 'key'
}
