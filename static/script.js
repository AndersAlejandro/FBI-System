document.querySelector("form[action='/SignIn']").addEventListener("submit", async (event) => {
  event.preventDefault()

  const { email, password } = event.target

  const response = await fetch("/SignIn", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })

  const data = await response.json()

  event.target.innerHTML = data.html
  sessionStorage.setItem('token', data.token)

  setTimeout(event.target.children[2].addEventListener("click", getCasos), 0)
})

async function getCasos(event) {
  event.preventDefault()

  const token = sessionStorage.getItem('token')
  const response = await fetch("/Casos", {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })

  const data = await response.json()
  event.target.offsetParent.innerHTML = crearCartas(data)
  console.log(event.target.offsetParent)
}

const crearCartas = (data) => {
  let text

  data.forEach(el => {
    text += `<div class="card-body">
    ${el.id} - ${el.title} ${el.description}
  </div>`
  })

  const card = `<div class="card">
    ${text}
  </div>`

  return text
}