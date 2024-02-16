import { FC, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { EyeIcon, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(6),
});

interface SignInProps {}

const SignIn: FC<SignInProps> = ({}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmitHandler(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className=" w-full flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="space-y-8   bg-card  rounded-md p-8 md:w-[calc(60%)]  w-full text-card-foreground"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} autoFocus />
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
                  Password must be at least of 6 characters one Capital letter ,
                  one Symbol and a number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" flex flex-col gap-y-4 ">
            <Button type="submit" variant={"gradient"} size={"md"}>
              Sign In
            </Button>
            <div className=" w-full flex flex-row gap-x-2 mt-2 ">
              <Link to="/auth/sign-up" className=" text-sm">
                Don`t have an account please
                <span className=" underline space-x-2 text-secondary">
                  Sign Up
                </span>
              </Link>
              <Link
                to="/auth/sign-up"
                className=" text-sm ml-auto text-secondary"
              >
                <span className=" underline space-x-2">Forgot Password</span>
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
