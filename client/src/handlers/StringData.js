const getStringDate=(fd)=>{
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]
    let date=new Date(fd)
    let stringVal=date.getDate().toString()+"-"+month[date.getMonth()]+"-"+date.getFullYear().toString()
    return stringVal
  }

  export default getStringDate