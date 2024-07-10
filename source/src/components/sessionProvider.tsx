"use client"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { IReactNode } from '../typeModule';

const SessionProviderComponent = ({ children } : IReactNode) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default SessionProviderComponent;