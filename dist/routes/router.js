"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../services/controller"));
const router = (0, express_1.default)();
router.post('/notes', controller_1.default.createNote);
router.delete('/notes/:id', controller_1.default.delete);
router.patch('/notes/:id', controller_1.default.updateNote);
router.get('/notes/stats', controller_1.default.getStats);
router.get('/notes/:id', controller_1.default.getNoteId);
router.get('/notes', controller_1.default.getNotes);
router.get('*', controller_1.default.getAll);
exports.default = router;
