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

export let initialState: InitialState = {
   dataActive: [
      {
         id: 1,
         name: "Shopping list",
         created: "April 20, 2021",
         category: "Task",
         content: "Tomatoes, bread",
         dates: "",
         active: true
      },
      {
         id: 2,
         name: "The theory of evolut...",
         created: "April 27, 2021",
         category: "Random Thought",
         content: "The evolution...",
         dates: "",
         active: true
      },
      {
         id: 3,
         name: "New Feature",
         created: "May 05, 2021",
         category: "Idea",
         content: "Implement new...",
         dates: "3/5/2021, 5/5/2021",
         active: true
      },
      {
         id: 4,
         name: "Create function",
         created: "May 13,2021",
         category: "Task",
         content: "function can use...",
         dates: "",
         active: true
      },
      {
         id: 5,
         name: "Books",
         created: "May 15,2021",
         category: "Task",
         content: "The Lean Startup",
         dates: "",
         active: true
      },
      {
         id: 6,
         name: "Bug fix",
         created: "May 18,2021",
         category: "Idea",
         content: "Implement data storage",
         dates: "",
         active: true
      },
      {
         id: 7,
         name: "Books",
         created: "May 23,2021",
         category: "Task",
         content: "The Lean Startup",
         dates: "",
         active: true
      }
   ],
   dataArchived: [
      {
         id: 8,
         name: "Shopping list",
         created: "April 20, 2021",
         category: "Task",
         content: "Tomatoes, bread",
         dates: "",
         active: false
      },
      {
         id: 9,
         name: "The theory of evolut...",
         created: "April 27, 2021",
         category: "Random Thought",
         content: "The evolution...",
         dates: "",
         active: false
      }
   ],
   summaryData: [
      {
         category: "Task",
         active: 13,
         archived: 4
      },
      {
         category: "Random Thought",
         active: 7,
         archived: 12
      },
      {
         category: "Idea",
         active: 4,
         archived: 6
      }
   ]
}