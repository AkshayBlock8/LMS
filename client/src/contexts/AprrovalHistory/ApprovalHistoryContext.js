import React,{useState,createContext} from 'react'

export const ApprovalHistoryContext=new createContext()

export const ApprovalHistoryProvider=(props)=>{
    let [ahistory,setAhistory]=useState(undefined)

    return (
        <ApprovalHistoryContext.Provider value={[ahistory,setAhistory]}>
            {props.children}
        </ApprovalHistoryContext.Provider>
    )
}
