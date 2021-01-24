import React, { createContext, useContext } from 'react'

interface IContextProps {}

const Context = createContext({} as IContextProps)

export const StateProvider: React.FC = ({ children }) => {
  const value: IContextProps = {}

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useContextValue = () => useContext(Context)
