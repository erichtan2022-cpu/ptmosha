import { ConvexProvider as ConvexReactProvider, ConvexReactClient } from "convex/react";

const convexUrl = import.meta.env.VITE_CONVEX_URL 
  ?? import.meta.env.NEXT_PUBLIC_CONVEX_URL 
  ?? "https://successful-pelican-294.convex.cloud";
const convex = new ConvexReactClient(convexUrl);

export function ConvexProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConvexReactProvider client={convex}>
      {children}
    </ConvexReactProvider>
  );
}
