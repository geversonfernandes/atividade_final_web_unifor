document.addEventListener('DOMContentLoaded', async () => {
  function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
    return null
  }

  const token = getCookie('token')

  if (!token) {
    window.location.href = '/login'
    return
  }

  const apiUrl = '/api/invited/'

  const personList = document.getElementById('person-list')
  const personName = document.getElementById('person-name')
  const personEmail = document.getElementById('person-email')
  const addPersonBtn = document.getElementById('add-person-btn')
  let editingPersonId = null

  const loadInvitedList = async () => {
    try {
      const response = await axios.get(apiUrl)
      const invitedList = response.data
      displayInvitedList(invitedList)
    } catch (error) {
      console.error('Erro ao carrega a lista:', error)
    }
  }

  const displayInvitedList = (invitedList) => {
    personList.innerHTML = ''

    invitedList.forEach((person) => {
      const row = document.createElement('tr')
      row.innerHTML = `
        <td>${person.name}</td>
        <td>${person.email}</td>
        <td>
          <button data-id="${person._id}" class="btn btn-warning btn-sm mt-1 mb-1 edit-btn"><i class="bi bi-pencil"></i> Editar</button>
          <button data-id="${person._id}" class="btn btn-danger btn-sm mt-1 mb-1 delete-btn"> <i class="bi bi-trash"></i> Excluir</button>
        </td>
      `
      personList.appendChild(row)
    })
  }

  addPersonBtn.addEventListener('click', async () => {
    const name = personName.value
    const email = personEmail.value

    if (!name || !email) {
      alert('Preencha todos os campos!')
      return
    }

    try {
      if (editingPersonId) {
        await axios.put(`${apiUrl}/${editingPersonId}`, { name, email })
      } else {
        await axios.post(apiUrl, { name, email }, { withCredentials: true })
      }

      personName.value = ''
      personEmail.value = ''
      editingPersonId = null
      loadInvitedList()
    } catch (error) {
      console.error('Erro ao salvar convidado:', error)
    }
  })

  personList.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const id = event.target.getAttribute('data-id')
      try {
        await axios.delete(`${apiUrl}/${id}`)
        loadInvitedList()
      } catch (error) {
        console.error('Erro ao excluir convidado:', error)
      }
    }
  })

  personList.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-btn')) {
      const id = event.target.getAttribute('data-id')
      const row = event.target.closest('tr')
      const name = row.cells[0].textContent
      const email = row.cells[1].textContent

      personName.value = name
      personEmail.value = email
      editingPersonId = id
    }
  })

  document
    .getElementById('logout-btn')
    .addEventListener('click', async function () {
      try {
        const response = await axios.post(
          '/api/user/logout',
          {},
          { withCredentials: true }
        )

        if (response.status === 200) {
          window.location.href = '/login'
        }
      } catch (error) {
        console.error('Erro ao fazer logout:', error)
      }
    })

  loadInvitedList()
})
