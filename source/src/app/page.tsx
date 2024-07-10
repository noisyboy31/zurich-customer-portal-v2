"use client";
import * as React from 'react';
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button, Container, Box } from '@mui/material';
import LoadingComponent from '../components/loading';

export default function Home() {
  // data is session
  const { status, data } = useSession();
  const main = { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}

  if (status === "loading") return <LoadingComponent />
  if (!data) {
    return (
      <Container maxWidth="md">
        <Box style={main}>
          <Button
              variant="contained"
              color="primary"
              onClick={() => signIn("google", { callbackUrl: '/membership' })}
          >
            Login Using Google
          </Button>
        </Box>
      </Container>
    );
  }
  
  return redirect("/membership")
}
