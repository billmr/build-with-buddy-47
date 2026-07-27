import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "../components/CartProvider";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CartDrawer } from "../components/CartDrawer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-center text-white">
      <div className="max-w-md">
        <h1 className="text-7xl font-bold">404</h1>
        <p className="mt-4 text-sm uppercase tracking-widest text-white/60">Page not found</p>
        <Link
          to="/"
          className="mt-6 inline-block border border-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-center text-white">
      <div className="max-w-md">
        <h1 className="text-xl font-bold uppercase tracking-widest">This page didn't load</h1>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black"
          >
            Try again
          </button>
          <Link
            to="/"
            className="border border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white/80 hover:border-white hover:text-white"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Atelier Zéro — Start From Nothing. Become Everything." },
      { name: "description", content: "Atelier Zéro : streetwear et performance pensés comme des outils de reconstruction." },
      { name: "author", content: "Atelier Zéro" },
      { property: "og:title", content: "Atelier Zéro — Start From Nothing. Become Everything." },
      { property: "og:description", content: "Atelier Zéro : streetwear et performance pensés comme des outils de reconstruction." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <AppShell />
      </CartProvider>
    </QueryClientProvider>
  );
}

function AppShell() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Header onOpenCart={() => setCartOpen(true)} />
      <div className="flex-1 pt-[var(--header-height)]">
        <Outlet />
      </div>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}