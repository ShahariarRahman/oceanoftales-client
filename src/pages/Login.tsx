import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import loginCover from "../assets/images/login-cover.jpg";
import { LoginForm } from "@/components/LoginForm";
import Logo from "@/components/ui/logo";
export default function Login() {
  return (
    <>
      <section className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 text-gray-600">
        <aside className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage: `url(${loginCover})`,
            }}
          />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Logo variant="white" />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2"></blockquote>
          </div>
        </aside>
        <div className="p-10">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                Login to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below
              </p>
            </div>
            <LoginForm />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Create Account
                </span>
              </div>
            </div>
            <div className="flex justify-start items-center text-sm border-b-[1px] pb-5">
              <p>Not member yet?</p>
              <Button
                className="underline py-0 px-1 text-blue-600 font-normal"
                variant="link"
              >
                <Link to="/sign-up">Create Account</Link>
              </Button>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
