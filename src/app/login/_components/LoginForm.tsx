import { type FormEvent, type InputHTMLAttributes } from "react";
import { auth } from "auth";
import { api } from "@/trpc/server";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginForm() {
  const res = await auth();
  console.log(res);

  async function formAction(formData: FormData) {
    "use server";
    const validationRes = await api.auth.signIn(formData);
    if (validationRes.isOK) redirect("/");

    // try {
    //   const p = await api.auth.signIn(formData);
    // } catch (error) {
    //   if (error instanceof AuthError) {
    //     if (error.type === "CredentialsSignin") return "Invalid credentials.";
    //     return "Something went wrong.";
    //   }
    //   console.log("redirectttttttttttttt");
    // }
  }

  return (
    <form
      className="flex max-w-[30ch] flex-col items-center gap-3 text-text"
      action={formAction}
    >
      <h1 className="mb-4 text-center text-3xl font-bold tracking-wider text-accent">
        Welcome back
      </h1>
      <div>
        <StyledInput
          type="email"
          name="email"
          id="email"
          placeholder="Email address*"
          required
        />
      </div>
      <div>
        <StyledInput
          type="password"
          name="password"
          id="password"
          placeholder="Password*"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 w-[28ch] rounded-md bg-accent px-4 py-3 text-background hover:bg-accent/80"
      >
        Continue
      </button>
      <p className="mt-6 text-center">
        No account? Looks like you&lsquo;re not part of the pride.
      </p>
    </form>
  );
}

function StyledInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-[28ch] rounded-md bg-primary px-5 py-3 placeholder-text/50 focus:outline-double focus:outline-accent"
      {...props}
    />
  );
}
