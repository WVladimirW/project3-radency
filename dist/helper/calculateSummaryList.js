"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSummaryList = void 0;
function getDataForSummaryList(data) {
    return data.reduce((ac, item) => {
        if (item.category === "Task")
            return Object.assign(Object.assign({}, ac), { "Task": ac["Task"] + 1 });
        if (item.category === "Random Thought")
            return Object.assign(Object.assign({}, ac), { "Random Thought": ac["Random Thought"] + 1 });
        if (item.category === "Idea")
            return Object.assign(Object.assign({}, ac), { "Idea": ac["Idea"] + 1 });
    }, {
        "Task": 0,
        "Random Thought": 0,
        "Idea": 0
    });
}
function calculateSummaryList(dataActive, dataArchived, summaryData) {
    let activeObj = getDataForSummaryList(dataActive);
    let archivedObj = getDataForSummaryList(dataArchived);
    for (let i = 0; i < summaryData.length; i++) {
        if (summaryData[i].category === "Task") {
            summaryData[i].active = activeObj["Task"];
            summaryData[i].archived = archivedObj["Task"];
        }
        if (summaryData[i].category === "Random Thought") {
            summaryData[i].active = activeObj["Random Thought"];
            summaryData[i].archived = archivedObj["Random Thought"];
        }
        if (summaryData[i].category === "Idea") {
            summaryData[i].active = activeObj["Idea"];
            summaryData[i].archived = archivedObj["Idea"];
        }
    }
}
exports.calculateSummaryList = calculateSummaryList;
