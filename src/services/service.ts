import { Request, Response } from 'express'
import { initialState } from '../repositories/data'
import { getRegularDate } from '../helpers/getRegularDate'
import { calculateSummaryList } from '../helpers/calculateSummaryList'
import { DataRequestType, DataActiveRequestType, DataType, summaryDataType } from '../helpers/types'

class Service {
   createNote(note: DataRequestType): DataType {
      let newNote: DataType = {
         id: +(new Date()),
         name: note.name,
         created: String(new Date().toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric'
         })),
         category: note.category,
         content: note.content,
         dates: getRegularDate(note.content),
         active: true
      }
      initialState.dataActive.push(newNote)
      return newNote
   }

   delete(noteId: string): DataType | undefined {
      let deleteNote = initialState.dataActive.find(item => item.id === +noteId)
         || initialState.dataArchived.find(item => item.id === +noteId)

      initialState.dataActive = initialState.dataActive.filter(item => item.id !== +noteId)
      initialState.dataArchived = initialState.dataArchived.filter(item => item.id !== +noteId)

      return deleteNote
   }

   updateNote(id: string, noteToUpdate: DataActiveRequestType): DataType | undefined {
      let foundNote = initialState.dataActive.find(item => item.id === +id)
         || initialState.dataArchived.find(item => item.id === +id)

      if (foundNote) {
         if (noteToUpdate.active === undefined) {
            foundNote.name = noteToUpdate.name
            foundNote.category = noteToUpdate.category
            foundNote.content = noteToUpdate.content
            foundNote.dates = getRegularDate(noteToUpdate.content)
         } else {
            if (foundNote.active === true && noteToUpdate.active === false) {
               foundNote.active = noteToUpdate.active
               initialState.dataActive = initialState.dataActive.filter(item => item.id !== +id)
               initialState.dataArchived.push(foundNote)
            } else if (foundNote.active === false && noteToUpdate.active === true) {
               foundNote.active = noteToUpdate.active
               initialState.dataArchived = initialState.dataArchived.filter(item => item.id !== +id)
               initialState.dataActive.push(foundNote)
            }
         }
      }
      return foundNote
   }

   getStats(): summaryDataType[] {
      calculateSummaryList(initialState.dataActive, initialState.dataArchived, initialState.summaryData)
      return initialState.summaryData
   }

   getNoteId(noteId: string): DataType | undefined {
      let notes = [...initialState.dataActive, ...initialState.dataArchived]

      let foundNote = notes.find(item => item.id === +noteId)

      return foundNote
   }

   getNotes(): DataType[] {
      let notes = [...initialState.dataActive, ...initialState.dataArchived]
      return notes
   }

   getAll(): void {
      return
   }
}

export default new Service()