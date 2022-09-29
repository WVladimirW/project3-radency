export const getRegularDate = (str: string) => {
   var m = str.match(/[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/g)
   return m ? m.join(", ") : ""
}