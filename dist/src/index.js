"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_1 = require("./data");
const calculateSummaryList_1 = require("../helper/calculateSummaryList");
const getRegularDate_1 = require("../helper/getRegularDate");
const app = (0, express_1.default)();
const port = 3000;
const jsonBody = express_1.default.json();
app.use(jsonBody);
app.post('/notes', (req, res) => {
    if (!req.body.name || !req.body.category || !req.body.content) {
        res.sendStatus(400);
        return;
    }
    let newNote = {
        id: +(new Date()),
        name: req.body.name,
        created: String(new Date().toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric'
        })),
        category: req.body.category,
        content: req.body.content,
        dates: (0, getRegularDate_1.getRegularDate)(req.body.content),
        active: true
    };
    data_1.initialState.dataActive.push(newNote);
    res.status(201).json(newNote);
});
app.delete('/notes/:id', (req, res) => {
    let deleteNote = data_1.initialState.dataActive.find(item => item.id === +req.params.id)
        || data_1.initialState.dataArchived.find(item => item.id === +req.params.id);
    data_1.initialState.dataActive = data_1.initialState.dataActive.filter(item => item.id !== +req.params.id);
    data_1.initialState.dataArchived = data_1.initialState.dataArchived.filter(item => item.id !== +req.params.id);
    if (!deleteNote) {
        res.send('Already up to date');
    }
    res.sendStatus(204);
});
app.patch('/notes/:id', (req, res) => {
    let foundNote = data_1.initialState.dataActive.find(item => item.id === +req.params.id)
        || data_1.initialState.dataArchived.find(item => item.id === +req.params.id);
    if (!foundNote) {
        res.sendStatus(404);
        return;
    }
    if (req.body.active === undefined) {
        foundNote.name = req.body.name;
        foundNote.category = req.body.category;
        foundNote.content = req.body.content;
        foundNote.dates = (0, getRegularDate_1.getRegularDate)(req.body.content);
    }
    else {
        if (foundNote.active === true && req.body.active === false) {
            foundNote.active = req.body.active;
            data_1.initialState.dataActive = data_1.initialState.dataActive.filter(item => item.id !== +req.params.id);
            data_1.initialState.dataArchived.push(foundNote);
        }
        else if (foundNote.active === false && req.body.active === true) {
            foundNote.active = req.body.active;
            data_1.initialState.dataArchived = data_1.initialState.dataArchived.filter(item => item.id !== +req.params.id);
            data_1.initialState.dataActive.push(foundNote);
        }
    }
    res.json(foundNote);
});
app.get('/notes/stats', (req, res) => {
    (0, calculateSummaryList_1.calculateSummaryList)(data_1.initialState.dataActive, data_1.initialState.dataArchived, data_1.initialState.summaryData);
    res.json(data_1.initialState.summaryData);
});
app.get('/notes/:id', (req, res) => {
    let notes = [...data_1.initialState.dataActive, ...data_1.initialState.dataArchived];
    let foundNote = notes.find(item => item.id === +req.params.id);
    if (!foundNote) {
        res.sendStatus(404);
        return;
    }
    res.json(foundNote);
});
app.get('/notes', (req, res) => {
    let notes = [...data_1.initialState.dataActive, ...data_1.initialState.dataArchived];
    res.json(notes);
});
app.get('*', (req, res) => {
    res.sendStatus(404);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
