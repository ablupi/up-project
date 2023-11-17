const init = () => {
  const msgEl = document.createElement('div')
  msgEl.setAttribute('class', 'global-msg')
  msgEl.setAttribute('id', 'o-message')
  msgEl.innerHTML = `
    <div class="animate__animated animate__fadeInDown">
      <img src="${onlineImg}"></img>
      <p>${text}</p>
    </div>
  `
  const bodyEl = document.querySelector('body')
  bodyEl?.appendChild(msgEl)
}

const destory = () => {
  const msgEl = document.getElementById('o-message')
  const bodyEl = document.querySelector('body')
  if (msgEl)
    bodyEl?.removeChild(msgEl)
}

let onlineImg = ''
let text = ''

// svg转base64网站：https://www.fengjs.com/tools/svg2path.html
const imgSuccess = 'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB2aWV3Qm94PScwIDAgMTAyNCAxMDI0JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHdpZHRoPScyMDAnIGhlaWdodD0nMjAwJz48cGF0aCBkPSdNNTEyIDg1LjMzMzMzM2MyMzUuNjQ4IDAgNDI2LjY2NjY2NyAxOTEuMDE4NjY3IDQyNi42NjY2NjcgNDI2LjY2NjY2N3MtMTkxLjAxODY2NyA0MjYuNjY2NjY3LTQyNi42NjY2NjcgNDI2LjY2NjY2N1M4NS4zMzMzMzMgNzQ3LjY0OCA4NS4zMzMzMzMgNTEyIDI3Ni4zNTIgODUuMzMzMzMzIDUxMiA4NS4zMzMzMzN6IG0tNzQuOTY1MzMzIDU1MC40TDM0Ni40NTMzMzMgNTQ1LjE1MmE0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMSAwLTYwLjMzMDY2NiA2MC4zMzA2NjdsMTIwLjcwNCAxMjAuNzA0YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDAgNjAuMzMwNjY2IDBsMzAxLjY1MzMzNC0zMDEuNjk2YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAxIDAtNjAuMjg4LTYwLjMzMDY2N2wtMjcxLjUzMDY2NyAyNzEuNDg4eicgZmlsbD0nIzUyQzQxQSc+PC9wYXRoPjwvc3ZnPg=='
const imgWarning = 'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB2aWV3Qm94PScwIDAgMTAyNCAxMDI0JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHdpZHRoPScyMDAnIGhlaWdodD0nMjAwJz48cGF0aCBkPSdNNTEyIDkwOS4wNjEyMjRjLTIxOC45MDYxMjIgMC0zOTcuMDYxMjI0LTE3OC4xNTUxMDItMzk3LjA2MTIyNC0zOTcuMDYxMjI0czE3OC4xNTUxMDItMzk3LjA2MTIyNCAzOTcuMDYxMjI0LTM5Ny4wNjEyMjQgMzk3LjA2MTIyNCAxNzguMTU1MTAyIDM5Ny4wNjEyMjQgMzk3LjA2MTIyNC0xNzguMTU1MTAyIDM5Ny4wNjEyMjQtMzk3LjA2MTIyNCAzOTcuMDYxMjI0eicgZmlsbD0nI0YyQ0I1MSc+PC9wYXRoPjxwYXRoIGQ9J001MTIgNjkwLjY3NzU1MW0tMzEuMzQ2OTM5IDBhMzEuMzQ2OTM5IDMxLjM0NjkzOSAwIDEgMCA2Mi42OTM4NzggMCAzMS4zNDY5MzkgMzEuMzQ2OTM5IDAgMSAwLTYyLjY5Mzg3OCAwWicgZmlsbD0nI0U1NDA0Ric+PC9wYXRoPjxwYXRoIGQ9J001MTIgNTg0LjA5Nzk1OWMtMTEuNDkzODc4IDAtMjAuODk3OTU5LTkuNDA0MDgyLTIwLjg5Nzk1OS0yMC44OTc5NTl2LTI2MS4yMjQ0OWMwLTExLjQ5Mzg3OCA5LjQwNDA4Mi0yMC44OTc5NTkgMjAuODk3OTU5LTIwLjg5Nzk1OXMyMC44OTc5NTkgOS40MDQwODIgMjAuODk3OTU5IDIwLjg5Nzk1OXYyNjEuMjI0NDljMCAxMi4wMTYzMjctOS40MDQwODIgMjAuODk3OTU5LTIwLjg5Nzk1OSAyMC44OTc5NTl6JyBmaWxsPScjRTU0MDRGJz48L3BhdGg+PC9zdmc+'
const imgError = 'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB2aWV3Qm94PScwIDAgMTAyNCAxMDI0JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHdpZHRoPScyMDAnIGhlaWdodD0nMjAwJz48cGF0aCBkPSdNNTEyIDk4MS4zMzMzMzNDMjUyLjggOTgxLjMzMzMzMyA0Mi42NjY2NjcgNzcxLjIgNDIuNjY2NjY3IDUxMlMyNTIuOCA0Mi42NjY2NjcgNTEyIDQyLjY2NjY2N3M0NjkuMzMzMzMzIDIxMC4xMzMzMzMgNDY5LjMzMzMzMyA0NjkuMzMzMzMzLTIxMC4xMzMzMzMgNDY5LjMzMzMzMy00NjkuMzMzMzMzIDQ2OS4zMzMzMzN6IG00NC4yNDUzMzMtNDY5LjMzMzMzM2wxNTkuOTE0NjY3LTE1OS45MTQ2NjdhMzEuMjc0NjY3IDMxLjI3NDY2NyAwIDEgMC00NC4yNDUzMzMtNDQuMjQ1MzMzTDUxMiA0NjcuNzU0NjY3IDM1Mi4wODUzMzMgMzA3Ljg0YTMxLjI3NDY2NyAzMS4yNzQ2NjcgMCAxIDAtNDQuMjQ1MzMzIDQ0LjI0NTMzM0w0NjcuNzU0NjY3IDUxMmwtMTU5LjkxNDY2NyAxNTkuOTE0NjY3YTMxLjI3NDY2NyAzMS4yNzQ2NjcgMCAxIDAgNDQuMjQ1MzMzIDQ0LjI0NTMzM0w1MTIgNTU2LjI0NTMzM2wxNTkuOTE0NjY3IDE1OS45MTQ2NjdhMzEuMjc0NjY3IDMxLjI3NDY2NyAwIDEgMCA0NC4yNDUzMzMtNDQuMjQ1MzMzTDU1Ni4yNDUzMzMgNTEyeicgZmlsbD0nI0Y1MjIyRCc+PC9wYXRoPjwvc3ZnPg=='

const message = {
  success: (msg = '成功', time = 2, callback = () => {return}) => {
    onlineImg = imgSuccess
    text = msg
    init()
    setTimeout(() => {
      destory()
      callback()
    }, time*1000);
  },
  warning: (msg = '成功', time = 2, callback = () => {return}) => {
    onlineImg = imgWarning
    text = msg
    init()
    setTimeout(() => {
      destory()
      callback()
    }, time*1000);
  },
  error: (msg = '成功', time = 2, callback = () => {return}) => {
    onlineImg = imgError
    text = msg
    init()
    setTimeout(() => {
      destory()
      callback()
    }, time*1000);
  },
}

export default message