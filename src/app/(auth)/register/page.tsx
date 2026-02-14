import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleIcon } from "@/components/ui/icons";
import Link from "next/link";
import { googleLoginAction } from "@/actions/authActions";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Create an account</CardTitle>
        <CardDescription>
          Enter your information to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form action={googleLoginAction}>
          <Button type="submit" variant="outline" className="w-full">
            <GoogleIcon className="mr-2 h-4 w-4" />
            Sign up with Google
          </Button>
        </form>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <RegisterForm />

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline hover:text-primary">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}