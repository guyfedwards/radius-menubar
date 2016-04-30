const ipc = require('ipc')
const clipboard = require('clipboard')
const updateButton = document.querySelector('.js-update')
const quitButton = document.querySelector('.js-quit')
const span = document.querySelector('.output')

new clipboard('[class^="color-"]')

ipc.on('update-elements', (arg) => {
  arg.forEach(curr => {
    span.appendChild(createElement(curr))
  })
})

document.body.addEventListener('click', e => {
  let action = e.target.getAttribute('data-action')

  switch (action) {
    case 'update-colors':
      updateColors()
      break
    case 'quit':
      quit()
      break
  }
})

function updateColors() {
  ipc.send('update-colors')
}

function quit() {
  ipc.send('quit')
}

function createElement(obj) {
  const darkRegEx = /(dark|black)/
  let el = document.createElement('div')
  let isDark = darkRegEx.test(obj.name)

  el.innerHTML = `<strong>${obj.name}</strong>`
  el.setAttribute('data-clipboard-text', obj.func)
  el.classList.add(obj.className)

  if (isDark) {
    el.style.color = '#ffffff';
  }

  return el
}
