import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  redirect,
} from "react-router";

import type { Route } from "./+types/root";
import { MainNavbar } from "../components/main-navbar";
import "./app.css";

import { supabaseClientFromRequest } from "components/auth/client";
import { ToastContainer, ToastProvider } from "components/core/toast";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Bree+Serif&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ params }: Route.ComponentProps) {
  return (
    <div className="min-h-screen bg-[#ebebeb] mx-auto">
      <ToastProvider>
        <MainNavbar />
        <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
          <ToastContainer />
          <Outlet />
        </main>
      </ToastProvider>
    </div>
  );
}

async function authMiddleware({ request, context }, next) {
  const requestURL = new URL(request.url);
  var { supabaseClient, headers } = supabaseClientFromRequest(request);

  var hasUser: boolean = false;
  if (supabaseClient) {
    const { data, error } = await supabaseClient.auth.getUser();
    hasUser = data?.user != null;
  }
  let shouldSkip: boolean =
    hasUser ||
    requestURL.pathname == "/signin" ||
    requestURL.pathname == "/auth-callback" ||
    requestURL.pathname == "/logout" ||
    requestURL.pathname == "/test";

  if (!shouldSkip) {
    return redirect("/signin");
  }
  const response = await next();
  for (const [key, value] of headers.entries()) {
    response.headers.set(key, value);
  }
  return response;
}

export const middleware = [authMiddleware];

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export function ErrorBoundary({ params, error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto bg-white">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
