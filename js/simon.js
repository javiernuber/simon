const levels = 15
let keys = generateKeys(levels)

function nextLevel(currentLevel) {
  if (currentLevel == levels) {
    swal({
      title: 'Winer!!',
      type: 'success'
    })
  }
  swal({
    title: `Level: ${currentLevel + 1}`,
    timer: 1500,
    showConfirmButton: false
  })
  for (let i = 0; i <= currentLevel; i++) {
    setTimeout(() => activate(keys[i]),
      1000 * (i+1) + 1000)
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
      window  .removeEventListener('keydown', onkeydown)
      setTimeout(() => swal({
        title: 'You lost :(',
        text: 'Do you want to play again?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelBittonText: 'No',
        closeOnConfirm: true
      }, function (ok) {
        if (ok) {
          keys = generateKeys(levels)
          nextLevel(0)
        }
      }), 1000)
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
