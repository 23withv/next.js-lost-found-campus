"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/services/authService";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await registerUser(formData);

    if (result?.error) {
        if (typeof result.error === 'string') {
             toast.error(result.error);
        } else {
             toast.error("Please check your input fields.");
        }
    } else {
      toast.success("Registration successful! Please login.");
      router.push("/login");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <div className="grid gap-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" placeholder="John Doe" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="name@example.com" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone Number (WhatsApp)</Label>
        <Input id="phone" name="phone" type="tel" placeholder="08..." required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" placeholder="********" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="********" required />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
      </Button>
    </form>
  );
}