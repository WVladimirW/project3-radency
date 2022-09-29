"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../repositories/data");
const getRegularDate_1 = require("../helpers/getRegularDate");
const calculateSummaryList_1 = require("../helpers/calculateSummaryList");
class Service {
    createNote(note) {
        let newNote = {
            id: +(new Date()),
            name: note.name,
            created: String(new Date().toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'
            })),
            category: note.category,
            content: note.content,
            dates: (0, getRegularDate_1.getRegularDate)(note.content),
            active: true
        };
        data_1.initialState.dataActive.push(newNote);
        return newNote;
    }
    delete(noteId) {
        let deleteNote = data_1.initialState.dataActive.find(item => item.id === +noteId)
            || data_1.initialState.dataArchived.find(item => item.id === +noteId);
        data_1.initialState.dataActive = data_1.initialState.dataActive.filter(item => item.id !== +noteId);
        data_1.initialState.dataArchived = data_1.initialState.dataArchived.filter(item => item.id !== +noteId);
        return deleteNote;
    }
    updateNote(id, noteToUpdate) {
        let foundNote = data_1.initialState.dataActive.find(item => item.id === +id)
            || data_1.initialState.dataArchived.find(item => item.id === +id);
        if (foundNote) {
            if (noteToUpdate.active === undefined) {
                foundNote.name = noteToUpdate.name;
                foundNote.category = noteToUpdate.category;
                foundNote.content = noteToUpdate.content;
                foundNote.dates = (0, getRegularDate_1.getRegularDate)(noteToUpdate.content);
            }
            else {
                if (foundNote.active === true && noteToUpdate.active === false) {
                    foundNote.active = noteToUpdate.active;
                    data_1.initialState.dataActive = data_1.initialState.dataActive.filter(item => item.id !== +id);
                    data_1.initialState.dataArchived.push(foundNote);
                }
                else if (foundNote.active === false && noteToUpdate.active === true) {
                    foundNote.active = noteToUpdate.active;
                    data_1.initialState.dataArchived = data_1.initialState.dataArchived.filter(item => item.id !== +id);
                    data_1.initialState.dataActive.push(foundNote);
                }
            }
        }
        return foundNote;
    }
    getStats() {
        (0, calculateSummaryList_1.calculateSummaryList)(data_1.initialState.dataActive, data_1.initialState.dataArchived, data_1.initialState.summaryData);
        return data_1.initialState.summaryData;
    }
    getNoteId(noteId) {
        let notes = [...data_1.initialState.dataActive, ...data_1.initialState.dataArchived];
        let foundNote = notes.find(item => item.id === +noteId);
        return foundNote;
    }
    getNotes() {
        let notes = [...data_1.initialState.dataActive, ...data_1.initialState.dataArchived];
        return notes;
    }
    getAll() {
        return;
    }
}
exports.default = new Service();
