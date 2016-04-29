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

updateButton.addEventListener('click', e => {
  ipc.send('update-colors')
})

quitButton.addEventListener('click', e => {
  ipc.send('quit')
})

function createElement(obj) {
  var el = document.createElement('div')

  el.innerHTML = `<strong>${obj.name}</strong>
  <span>${obj.func}</span>`
  el.setAttribute('data-clipboard-text', obj.func)
  el.classList.add(obj.className)
  return el
}
