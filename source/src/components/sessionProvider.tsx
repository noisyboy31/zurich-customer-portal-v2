"use client"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { IReactNode } from '../typeModule';
import { Provider } from "react-redux";
import store from '../app/redux/store';

const SessionProviderComponent = ({ children } : IReactNode) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        {children}
      </Provider>  
    </SessionProvider>
  )
}

export default SessionProviderComponent;