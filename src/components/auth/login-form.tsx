"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/actions/authActions";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";

export function EmailLoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(loginAction, undefined);

  return (
    <form action={formAction} className="grid gap-3">
      {errorMessage && (
        <div className="text-sm text-red-500 bg-red-50 p-2 rounded border border-red-200">
          {errorMessage}
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="name@example.com" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" placeholder="********" required />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign in with Email"}
      </Button>
    </form>
  );
}