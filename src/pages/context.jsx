import React, { createContext, useState } from 'react'

export const Context=createContext();
export const ContextProvider=({children})=> {
    const [items,setitems]=useState(0);

  return (
    <div>
        <Context.Provider value={{items,setitems}}>
            {children}
        </Context.Provider>
      
    </div>
  )
}

export default context
