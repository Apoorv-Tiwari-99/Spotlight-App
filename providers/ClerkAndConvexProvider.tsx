import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import {ConvexProviderWithClerk} from "convex/react-clerk";
import {ConvexReactClient} from "convex/react";
import React from "react";

const convex =new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!,{
    unsavedChangesWarning:false,
})

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing publishable key .Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY IN YOUR .env file"
  );
}
export default function ClerkAndConvexProvider({children}:{children:React.ReactNode}) {
  return (
    <ClerkProvider  publishableKey={publishableKey} tokenCache={tokenCache}>
     <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
      <ClerkLoaded>{children}</ClerkLoaded>
     </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}