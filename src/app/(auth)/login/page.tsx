'use client';

import { login } from "@/app/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

export default function Login() {
  const [state, formAction, pending] = useActionState(login, { message: "" });

  return (
    <form action={formAction} className="p-8 bg-white w-[320px] rounded-md shadow-md flex flex-col gap-6">
      <h1 className="text-3xl">Login</h1>

      {state.message && <p className="text-red-500 bg-red-50 py-2 px-4 rounded-lg">{state.message}</p>}

      <div>
        <label htmlFor="email">Email</label>
        <input name="email" disabled={pending} type="email" id="email" className="w-full border border-gray-300 rounded-md p-2" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input name="password" disabled={pending} type="password" id="password" className="w-full border border-gray-300 rounded-md p-2" />
      </div>

      <div>
        <button disabled={pending} className="w-full bg-blue-500 text-white rounded-md p-2 mt-4 cursor-pointer">
          {pending ? "Logging in..." : "Login"}
        </button>
      </div>

      <div className="text-center">
        <Link href="/register" className="text-blue-500">Create an account</Link>
      </div>
    </form>
  )
}