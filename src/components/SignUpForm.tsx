/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { HTMLAttributes, useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { IAuthInputs } from "@/types/globalTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthValidation } from "@/validation/auth.validation";
import { useSignUpMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { googleLogin, setUserEmail } from "@/redux/features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;
type SignUpError = { data?: any };

export function SignUpForm({ className, ...props }: UserAuthFormProps) {
  const [field, setField] = useState<IAuthInputs>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<IAuthInputs>({
    resolver: zodResolver(AuthValidation.signUpZodSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { email, password, confirmPassword } = useWatch({ control });

  const user = useAppSelector((state) => state.auth.user.email);

  const [postUser, { isLoading, isError, error: postError, reset: postReset }] =
    useSignUpMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.pathname || "/";
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (password?.length && confirmPassword?.length && password) {
      trigger("confirmPassword");
    }
    if (
      isError &&
      (field?.email !== email ||
        field?.password !== password ||
        field?.confirmPassword !== confirmPassword)
    ) {
      postReset();
    }
  }, [
    field,
    email,
    password,
    confirmPassword,
    trigger,
    isError,
    postReset,
    field?.confirmPassword,
    field?.email,
    field?.password,
  ]);

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  const onSubmit: SubmitHandler<IAuthInputs> = async (data) => {
    const isFormValid = await trigger();
    if (isFormValid) {
      const user = {
        email: data.email,
        password: data.password,
      };
      const postData = (await postUser(user)) as any;
      const accessToken = await postData?.data?.data?.accessToken;
      if (accessToken) {
        sessionStorage.setItem("accessToken", accessToken);
        dispatch(setUserEmail(user.email));
        reset();
      } else {
        setField(data);
      }
    }
  };

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  const errorMessage =
    errors.email?.message ||
    errors.password?.message ||
    errors.confirmPassword?.message ||
    (postError as SignUpError)?.data?.message;

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-3">
            <Label className="sr-only" htmlFor="sign-up-email">
              Email
            </Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    id="sign-up-email"
                    placeholder="name@example.com"
                    type="text"
                    {...field}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                  />
                </div>
              )}
            />

            <Label className="sr-only" htmlFor="sign-up-password">
              Password
            </Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    id="sign-up-password"
                    {...field}
                    placeholder="your password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="off"
                  />
                </div>
              )}
            />
            <Label className="sr-only" htmlFor="sign-up-confirm password">
              Confirm Password
            </Label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    id="sign-up-confirm password"
                    {...field}
                    placeholder="confirm password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="off"
                  />
                </div>
              )}
            />
          </div>

          {errorMessage ? (
            <>
              <p className="text-xs text-red-700">{errorMessage}</p>
              <Button
                disabled
                className="bg-red-600 hover:bg-red-500 text-white mt-2"
              >
                Create Account
              </Button>
            </>
          ) : (
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white mb-2 mt-8"
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
        onClick={handleGoogleLogin}
        disabled={isLoading}
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
