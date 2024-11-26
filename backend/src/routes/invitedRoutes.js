import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import {
  createInvited,
  getAllInvited,
  updateInvited,
  deleteInvited,
} from '../controllers/invitedController.js'

const router = express.Router()

router.post('/', authMiddleware, createInvited)

router.get('/', authMiddleware, getAllInvited)

router.put('/:id', authMiddleware, updateInvited)

router.delete('/:id', authMiddleware, deleteInvited)

export default router
