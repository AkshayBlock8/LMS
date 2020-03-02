import React,{useState,createContext} from 'react'

export const HistoryContext=new createContext()

export const HistoryProvider=(props)=>{
    let [history,setHistory]=useState(undefined)

    return (
        <HistoryContext.Provider value={[history,setHistory]}>
            {props.children}
        </HistoryContext.Provider>
    )
}
