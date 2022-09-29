export interface DataType {
   id: number,
   name: string,
   created: string,
   category: string,
   content: string,
   dates?: string,
   active: boolean
}

export interface summaryDataType {
   category: string,
   active: number,
   archived: number
}

export interface InitialState {
   dataActive: Array<DataType>,
   dataArchived: Array<DataType>,
   summaryData: Array<summaryDataType>
}

export interface acType {
   "Task": number,
   "Random Thought": number,
   "Idea": number
}

export type DataRequestType = {
   name: string,
   category: string,
   content: string
}
export type DataActiveRequestType = {
   name: string,
   category: string,
   content: string,
   active?: boolean
}