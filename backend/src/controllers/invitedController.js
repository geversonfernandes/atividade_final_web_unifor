import Invited from '../models/Invited.js'

export const createInvited = async (req, res) => {
  try {
    const { name, email } = req.body
    const newInvited = new Invited({
      name,
      email,
      userId: req.user.id,
    })
    await newInvited.save()
    res.status(201).json({ message: 'Convidado cadastrado com sucesso!' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erro ao cadastrar convidado!', error: error.message })
  }
}

export const getAllInvited = async (req, res) => {
  try {
    const invitedList = await Invited.find({ userId: req.user.id })
    res.status(200).json(invitedList)
  } catch (error) {
    console.error('Erro ao obter a lista de convidados:', error)
    res.status(500).json({ error: error.message })
  }
}

export const updateInvited = async (req, res) => {
  try {
    const { id } = req.params
    const updateInvited = await Invited.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.status(200).json(updateInvited)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteInvited = async (req, res) => {
  try {
    const { id } = req.params
    await Invited.findByIdAndDelete(id)
    res.status(200).json({ message: 'Convidado removido com sucesso!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
