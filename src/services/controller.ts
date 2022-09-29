import { Request, Response } from 'express'
import { initialState } from '../repositories/data'
import { getRegularDate } from '../helpers/getRegularDate'
import { calculateSummaryList } from '../helpers/calculateSummaryList'
import { DataRequestType, DataActiveRequestType, DataType, summaryDataType } from '../helpers/types'
import Service from './Service'

class Controller {
   createNote(req: Request<{}, {}, DataRequestType>, res: Response<DataType>) {
      if (!req.body.name || !req.body.category || !req.body.content) {
         res.sendStatus(400)
         return
      }

      const newNote = Service.createNote(req.body)

      res.status(201).json(newNote)
   }

   delete(req: Request<{ id: string }>, res: Response) {
      const deleteNote = Service.delete(req.params.id)

      if (deleteNote === undefined) {
         res.send('Already up to date')
      }

      res.sendStatus(204)
   }

   updateNote(req: Request<{ id: string }, {}, DataActiveRequestType>, res: Response<DataType>) {
      const foundNote = Service.updateNote(req.params.id, req.body)

      if (!foundNote) {
         res.sendStatus(404)
         return
      }

      res.json(foundNote)
   }

   getStats(req: Request, res: Response<summaryDataType[]>) {
      const summaryData = Service.getStats()
      res.json(summaryData)
   }

   getNoteId(req: Request<{ id: string }>, res: Response<DataType>) {
      const foundNote = Service.getNoteId(req.params.id)

      if (!foundNote) {
         res.sendStatus(404)
         return
      }

      res.json(foundNote)
   }

   getNotes(req: Request, res: Response<DataType[]>) {
      let notes = Service.getNotes()
      res.json(notes)
   }

   getAll(req: Request, res: Response) {
      res.sendStatus(404)
   }
}

export default new Controller()