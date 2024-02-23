import { FC, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRegisterUserMutation } from "@/app/features/user/auth-api";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { EyeIcon, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const formSchema = z
  .object({
    userName: z.string().min(3),
    email: z.string().email().min(1),
    password: z.string().min(6),
    conformPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.conformPassword, {
    message: "Passwords do not match",
    path: ["conformPassword"], // path of error
  });

interface SignUpProps {}

const SignUp: FC<SignUpProps> = () => {
  const navigate = useNavigate();
  const [RegisterUser, { isLoading, isError, isSuccess, error }] =
    useRegisterUserMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success(" Login Successful");
      navigate("/");
    }
  }, [isSuccess]);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      conformPassword: "",
    },
  });

  function onSubmitHandler(values: z.infer<typeof formSchema>) {
    RegisterUser(values);
  }

  if (isError) {
    toast.error(" some thing when wrong ");
    console.log(error);
  }
  return (
    <div className=" w-full flex justify-center items-center">
      {isLoading ? (
        <>
          <Skeleton className="h-96  md:w-[calc(50%)] rounded-xl" />
        </>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="space-y-8   bg-card  rounded-md p-8 md:w-[calc(50%)]  w-full text-card-foreground"
          >
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} autoFocus />
                  </FormControl>
                  <FormDescription>Enter your full name </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      {...field}
                      autoFocus
                    />
                  </FormControl>
                  <FormDescription>Enter your official email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className=" relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <>
                      <Input
                        placeholder="password"
                        {...field}
                        type={showPassword ? "text" : "password"}
                        autoComplete="false"
                      />
                      <button
                        type="button"
                        className="absolute  lg:top-1/2 transform -translate-y-1/2 right-2  top-1/3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeIcon className="w-4 h-4" />
                        ) : (
                          <EyeOff className=" w-4 h-4 " />
                        )}
                      </button>
                    </>
                  </FormControl>
                  <FormDescription>
                    Password must be at least of 6 characters one Capital letter
                    , one Symbol and a number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="conformPassword"
              render={({ field }) => (
                <FormItem className=" relative">
                  <FormLabel> ConformPassword </FormLabel>
                  <FormControl>
                    <>
                      <Input
                        placeholder="conformPassword"
                        {...field}
                        type={showPassword ? "text" : "password"}
                        autoComplete="false"
                      />
                      <button
                        type="button"
                        className="absolute  lg:top-1/2 transform -translate-y-1/2 right-2  top-1/3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeIcon className="w-4 h-4" />
                        ) : (
                          <EyeOff className=" w-4 h-4 " />
                        )}
                      </button>
                    </>
                  </FormControl>
                  <FormDescription>Please re-enter password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex flex-col gap-y-4 ">
              <Button type="submit" variant={"gradient"} size={"md"}>
                Sign In
              </Button>
              <div className=" w-full flex flex-row gap-x-2 mt-2 ">
                <Link to="/auth/sign-In" className=" text-sm">
                  Have an account please
                  <span className=" underline space-x-2 text-secondary">
                    Sign In
                  </span>
                </Link>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default SignUp;
