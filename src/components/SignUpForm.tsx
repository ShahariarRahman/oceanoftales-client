import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { HTMLAttributes, useEffect, useState } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUpForm({ className, ...props }: UserAuthFormProps) {
  const [isDisableButton, setIsDisableButton] = useState<boolean>(false);
  const [isConfirmPassActive, setIsConfirmPassActive] =
    useState<boolean>(false);

  const { handleSubmit, register, control } = useForm<Inputs>();

  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });

  useEffect(() => {
    if (!isConfirmPassActive && confirmPassword) {
      setIsConfirmPassActive(true);
    }
    if (
      password !== confirmPassword &&
      isConfirmPassActive &&
      !isDisableButton
    ) {
      setIsDisableButton(true);
    } else if (
      password === confirmPassword &&
      isConfirmPassActive &&
      isDisableButton
    ) {
      setIsDisableButton(false);
    }
  }, [password, confirmPassword, isConfirmPassActive, isDisableButton]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              {...register("email", { required: true })}
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={false}
            />
            <Input
              {...register("password", { required: true })}
              className=" focus:ring-offset-0"
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={false}
            />
            <Input
              {...register("confirmPassword", { required: true })}
              id="confirmPassword"
              placeholder="confirm password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={false}
            />
          </div>
          {/* <Button
            disabled={isDisable}
            className="bg-blue-600 hover:bg-blue-500 text-white"
          >
            {isDisable && <p>loading</p>}
            Create Account
          </Button> */}
          {isDisableButton && (
            <>
              <p className="text-xs text-red-700">{"password not matched"}</p>
              <Button
                disabled={isDisableButton}
                className="bg-red-600 hover:bg-red-500 text-white mt-2"
              >
                Create Account
              </Button>
            </>
          )}

          {!isDisableButton && (
            <Button
              disabled={isDisableButton}
              className="bg-blue-600 hover:bg-blue-500 text-white mt-8"
            >
              Create Account
            </Button>
          )}
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        className="flex items-center justify-between text-gray-900"
      >
        <p>Google</p>
        <FcGoogle />
      </Button>
    </div>
  );
}
