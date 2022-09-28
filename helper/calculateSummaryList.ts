import { DataType, summaryDataType } from '../src/data'

interface acType {
   "Task": number,
   "Random Thought": number,
   "Idea": number
}

function getDataForSummaryList(data: Array<any>) {
   return data.reduce((ac: acType, item: DataType) => {
      if (item.category === "Task") return { ...ac, "Task": ac["Task"] + 1 }
      if (item.category === "Random Thought") return { ...ac, "Random Thought": ac["Random Thought"] + 1 }
      if (item.category === "Idea") return { ...ac, "Idea": ac["Idea"] + 1 }
   }, {
      "Task": 0,
      "Random Thought": 0,
      "Idea": 0
   })
}

export function calculateSummaryList(dataActive: Array<DataType>, dataArchived: Array<DataType>, summaryData: Array<summaryDataType>) {
   let activeObj = getDataForSummaryList(dataActive)
   let archivedObj = getDataForSummaryList(dataArchived)

   for (let i = 0; i < summaryData.length; i++) {
      if (summaryData[i].category === "Task") {
         summaryData[i].active = activeObj["Task"]
         summaryData[i].archived = archivedObj["Task"]
      }
      if (summaryData[i].category === "Random Thought") {
         summaryData[i].active = activeObj["Random Thought"]
         summaryData[i].archived = archivedObj["Random Thought"]
      }
      if (summaryData[i].category === "Idea") {
         summaryData[i].active = activeObj["Idea"]
         summaryData[i].archived = archivedObj["Idea"]
      }
   }
}

