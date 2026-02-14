import { googleLoginAction } from "@/actions/authActions";
import { EmailLoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleIcon } from "@/components/ui/icons";
import Link from "next/link";

export default function LoginPage() {
    return (
        <Card className="w-full max-w-sm mx-auto my-10">
            <CardHeader>
                <CardTitle className="text-xl">Welcome Back!</CardTitle>
                <CardDescription>
                    Login with your Google, or Email Account
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                <form action={googleLoginAction}>
                    <Button type="submit" variant="outline" className="w-full">
                        <GoogleIcon className="mr-2 h-4 w-4" />
                        Sign in with Google
                    </Button>
                </form>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-card px-2">
                        Or continue with
                    </span>
                </div>

                <EmailLoginForm />

                <div className="text-center text-sm">
                    Don&apos;t have an account?{""}
                    <Link href="/register" className="underline hover:text-primary">
                        Register
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}