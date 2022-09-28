import express, { Request, Response } from 'express'
import { initialState } from './data'
import { calculateSummaryList } from '../helper/calculateSummaryList'
import { getRegularDate } from '../helper/getRegularDate'
import { DataType, summaryDataType } from './data'

const app = express()
const port = 3000

const jsonBody = express.json()
app.use(jsonBody)

type DataRequestType = {
   name: string,
   category: string,
   content: string
}
type DataActiveRequestType = {
   name: string,
   category: string,
   content: string,
   active?: boolean
}

app.post('/notes', (req: Request<{}, {}, DataRequestType>, res: Response<DataType>) => {
   if (!req.body.name || !req.body.category || !req.body.content) {
      res.sendStatus(400)
      return
   }

   let newNote = {
      id: +(new Date()),
      name: req.body.name,
      created: String(new Date().toLocaleDateString('en-US', {
         month: 'long', day: 'numeric', year: 'numeric'
      })),
      category: req.body.category,
      content: req.body.content,
      dates: getRegularDate(req.body.content),
      active: true
   }

   initialState.dataActive.push(newNote)
   res.status(201).json(newNote)
})
app.delete('/notes/:id', (req: Request<{ id: string }>, res: Response) => {
   let deleteNote = initialState.dataActive.find(item => item.id === +req.params.id)
      || initialState.dataArchived.find(item => item.id === +req.params.id)

   initialState.dataActive = initialState.dataActive.filter(item => item.id !== +req.params.id)
   initialState.dataArchived = initialState.dataArchived.filter(item => item.id !== +req.params.id)

   if (!deleteNote) {
      res.send('Already up to date')
   }

   res.sendStatus(204)
})
app.patch('/notes/:id', (req: Request<{ id: string }, {}, DataActiveRequestType>, res: Response<DataType>) => {
   let foundNote = initialState.dataActive.find(item => item.id === +req.params.id)
      || initialState.dataArchived.find(item => item.id === +req.params.id)

   if (!foundNote) {
      res.sendStatus(404)
      return
   }

   if (req.body.active === undefined) {
      foundNote.name = req.body.name
      foundNote.category = req.body.category
      foundNote.content = req.body.content
      foundNote.dates = getRegularDate(req.body.content)
   } else {
      if (foundNote.active === true && req.body.active === false) {
         foundNote.active = req.body.active
         initialState.dataActive = initialState.dataActive.filter(item => item.id !== +req.params.id)
         initialState.dataArchived.push(foundNote)
      } else if (foundNote.active === false && req.body.active === true) {
         foundNote.active = req.body.active
         initialState.dataArchived = initialState.dataArchived.filter(item => item.id !== +req.params.id)
         initialState.dataActive.push(foundNote)
      }
   }

   res.json(foundNote)
})
app.get('/notes/stats', (req: Request, res: Response<summaryDataType[]>) => {
   calculateSummaryList(initialState.dataActive, initialState.dataArchived, initialState.summaryData)
   res.json(initialState.summaryData)
})
app.get('/notes/:id', (req: Request<{ id: string }>, res: Response<DataType>) => {
   let notes = [...initialState.dataActive, ...initialState.dataArchived]

   let foundNote = notes.find(item => item.id === +req.params.id)

   if (!foundNote) {
      res.sendStatus(404)
      return
   }

   res.json(foundNote)
})
app.get('/notes', (req: Request, res: Response<DataType[]>) => {
   let notes = [...initialState.dataActive, ...initialState.dataArchived]
   res.json(notes)
})
app.get('*', (req: Request, res: Response) => {
   res.sendStatus(404)
})


app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})