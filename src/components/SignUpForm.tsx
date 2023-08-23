import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { HTMLAttributes, useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { IAuthInputs } from "@/types/globalTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthValidation } from "@/validation/auth.validation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  createUser,
  googleLogin,
  setError,
} from "@/redux/features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

export function SignUpForm({ className, ...props }: UserAuthFormProps) {
  const { user, isLoading, error, isError } = useAppSelector(
    (state) => state.auth,
  );

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

  const { password, confirmPassword } = useWatch({ control });

  const location = useLocation();
  const from = location?.state?.pathname || "/";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (password?.length && confirmPassword?.length && password) {
      trigger("confirmPassword");
    }
  }, [password, confirmPassword, trigger]);

  const onSubmit: SubmitHandler<IAuthInputs> = async (data) => {
    const isFormValid = await trigger();
    if (isFormValid) {
      const user = {
        email: data.email,
        password: data.password,
      };
      await dispatch(createUser(user));
    }
  };

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  useEffect(() => {
    if (user.email) {
      reset();
      navigate(from, { replace: true });
    }
  }, [user, from, reset, navigate]);

  const errorMessage =
    errors.email?.message ||
    errors.password?.message ||
    errors.confirmPassword?.message ||
    error ||
    "";

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
              render={({ field: { value, onChange } }) => (
                <div>
                  <Input
                    id="sign-up-email"
                    placeholder="name@example.com"
                    type="text"
                    onChange={async (e) => {
                      onChange(e.target.value);
                      if (isError && error) {
                        dispatch(
                          setError({
                            error: "",
                            isError: false,
                          }),
                        );
                      }
                      await trigger("email");
                    }}
                    value={value || ""}
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
              render={({ field: { value, onChange } }) => (
                <div>
                  <Input
                    id="sign-up-password"
                    onChange={async (e) => {
                      onChange(e.target.value);
                      if (isError && error) {
                        dispatch(
                          setError({
                            error: "",
                            isError: false,
                          }),
                        );
                      }
                      await trigger("password");
                    }}
                    value={value || ""}
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
