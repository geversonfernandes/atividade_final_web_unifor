document
  .getElementById('login-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    try {
      const response = await axios.post('/api/user/login', { email, password })

      if (response.status === 200) {
        window.location.href = '/home'
      }
    } catch (error) {
      alert(
        'Falha no login: ' +
          (error.response ? error.response.data.message : error.message)
      )
    }
  })
