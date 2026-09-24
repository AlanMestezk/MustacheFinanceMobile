import { Stack } from "expo-router";

import { Navbar } from "../../pages/Main/components/NavBar/NavBar";

export default function AppLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />

      <Navbar />
    </>
  );
}
