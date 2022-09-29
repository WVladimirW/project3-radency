import express from 'express'
import Controller from '../services/controller'

const router = express()

router.post('/notes', Controller.createNote)
router.delete('/notes/:id', Controller.delete)
router.patch('/notes/:id', Controller.updateNote)
router.get('/notes/stats', Controller.getStats)
router.get('/notes/:id', Controller.getNoteId)
router.get('/notes', Controller.getNotes)
router.get('*', Controller.getAll)

export default router