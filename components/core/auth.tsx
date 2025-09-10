"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

import { Alert } from "../ui-toolkit/alert";
import { AuthLayout } from "../ui-toolkit/auth-layout";
import { Button } from "../ui-toolkit/button";
import { Heading } from "../ui-toolkit/heading";
import { Fieldset, Legend } from "../ui-toolkit/fieldset";

import { GoogleOauthButton } from "./google_oauth_button";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

// console.log(supabase);

export async function handleSignInWithGoogle(response) {
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: response.credential,
  });
}

export function Auth() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.log("signin error");
    }
    setLoading(false);
  }
  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.log("signup error");
    }
    if (!session) console.log("Check your email for email verification!");
    setLoading(false);
  }
  return (
    <div className="space-y-8 max-w-4xl m-auto">
      <AuthLayout>
        <div className="w-200 flex flex-col items-center border-1 rounded p-5 border-gray-300">
          <Heading level={1} className="mb-5">
            Members and Applicants Sign In
          </Heading>
          <GoogleOauthButton />
          <div className="mb-4">
            <Fieldset>
              <Legend className="mb-2">
                <label htmlFor="email" className="text-black">
                  <Heading level={2}>Email</Heading>
                </label>
              </Legend>
              <input
                id="email"
                className="text-black bg-white font-normal border-1 border-gray-400 min-w-80"
                onChange={(text) => setEmail(String(text))}
                value={email}
                placeholder="email@address.com"
                autoCapitalize={"none"}
              />
            </Fieldset>
          </div>
          <div>
            <Fieldset>
              <Legend className="mb-2">
                <label htmlFor="password" className="text-black">
                  <Heading level={2}>Password</Heading>
                </label>
              </Legend>
              <input
                className="text-black bg-white font-normal border-1 border-gray-400 min-w-80"
                onChange={(text) => setPassword(String(text))}
                value={password}
                placeholder="password"
                type="password"
                autoCapitalize={"none"}
              />
            </Fieldset>
          </div>
          <div className="flex flex-col space-y-2 items-center justify-evenly mt-10 mb-5">
            <Button
              color="dark/primary"
              disabled={loading}
              onClick={() => signInWithEmail()}
            >
              Sign In
            </Button>
            <Button
              color="dark/primary"
              disabled={loading}
              onClick={() => signUpWithEmail()}
            >
              Sign Up
            </Button>
          </div>
          <p>
            To start an application, first authenticate with GitHub or Google.
            If you have any questions, email us at{" "}
            <a href="mailto:join@doubleunion.org">join@doubleunion.org</a>.
          </p>
        </div>
      </AuthLayout>
    </div>
  );
}
