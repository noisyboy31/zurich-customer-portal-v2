"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { IReactNode } from '../../typeModule';
import LoadingComponent from '../../components/loading';
import SessionProviderComponent from '../../components/sessionProvider';
import Header from '../../components/header';
import Footer from '../../components/footer';

export default function Layout({ children }: IReactNode) {
  // data is session
  const { status, data } = useSession({ required: true, onUnauthenticated() { redirect("/")} });

  if (status === "loading") return <LoadingComponent />
  if (data) {
    return (
      <SessionProviderComponent data-testid="session-provider">
        <Header />
          {children}
        <Footer />
      </SessionProviderComponent >
    );
  }

  redirect("/");
}