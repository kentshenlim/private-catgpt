import { type InputHTMLAttributes } from "react";

export default function LoginForm() {
  return (
    <form
      action=""
      className="flex max-w-[30ch] flex-col items-center gap-3 text-text"
    >
      <h1 className="mb-4 text-center text-3xl font-bold tracking-wider text-accent">
        Welcome back
      </h1>
      <div>
        <StyledInput
          type="text"
          name="email"
          id="email"
          placeholder="Email address*"
        />
      </div>
      <div>
        <StyledInput
          type="password"
          name="password"
          id="password"
          placeholder="Password*"
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
