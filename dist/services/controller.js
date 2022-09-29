"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("./Service"));
class Controller {
    createNote(req, res) {
        if (!req.body.name || !req.body.category || !req.body.content) {
            res.sendStatus(400);
            return;
        }
        const newNote = Service_1.default.createNote(req.body);
        res.status(201).json(newNote);
    }
    delete(req, res) {
        const deleteNote = Service_1.default.delete(req.params.id);
        if (deleteNote === undefined) {
            res.send('Already up to date');
        }
        res.sendStatus(204);
    }
    updateNote(req, res) {
        const foundNote = Service_1.default.updateNote(req.params.id, req.body);
        if (!foundNote) {
            res.sendStatus(404);
            return;
        }
        res.json(foundNote);
    }
    getStats(req, res) {
        const summaryData = Service_1.default.getStats();
        res.json(summaryData);
    }
    getNoteId(req, res) {
        const foundNote = Service_1.default.getNoteId(req.params.id);
        if (!foundNote) {
            res.sendStatus(404);
            return;
        }
        res.json(foundNote);
    }
    getNotes(req, res) {
        let notes = Service_1.default.getNotes();
        res.json(notes);
    }
    getAll(req, res) {
        res.sendStatus(404);
    }
}
exports.default = new Controller();
