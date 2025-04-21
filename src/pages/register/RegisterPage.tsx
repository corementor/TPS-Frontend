import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { registerSchema } from "@/lib/schemaValidation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const RegisterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsSubmitting(true);
    try {
      console.log(values);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex h-14 items-center px-6 lg:h-[60px] z-50">
        <div className="flex items-center gap-3 font-bold">
          <img
            src={logo}
            alt="Company Logo"
            className="w-8 h-8 object-contain"
          />
          <span>CRS</span>
        </div>
      </div>

      <div className="relative w-full min-h-screen flex justify-center items-center pt-14">
        {/* Diagonal split background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            {/* Gradient section */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-orange-400 via-purple-400 to-blue-400"
              style={{
                clipPath: "polygon(100% 0, 100% 100%, 0 100%, 100% 25%)",
              }}
            />
            {/* White section */}
            <div
              className="absolute inset-0 bg-white"
              style={{
                clipPath: "polygon(0 0, 100% 25%, 100% 0, 0 0)",
              }}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.3,
            delay: 0.1,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="relative z-10"
        >
          <Card className="w-[500px] shadow-lg backdrop-blur-md bg-white/95">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-2xl font-bold">
                Create an Account
              </CardTitle>
              <CardDescription>
                Enter your details to create your account
              </CardDescription>
            </CardHeader>

            {showError && (
              <p className="text-red-500 text-center border border-red-500 p-2 rounded-md mx-6 my-2 bg-red-50">
                Registration failed. Please try again.
              </p>
            )}

            <CardContent className="space-y-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            First Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John"
                              {...field}
                              className="h-11"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Last Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Doe"
                              {...field}
                              className="h-11"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john.doe@example.com"
                            {...field}
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              {...field}
                              className="h-11"
                            />
                            <button
                              type="button"
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                              onClick={toggleShowPassword}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <EyeIcon className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    {isSubmitting ? (
                      <Button disabled className="w-full h-11">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </Button>
                    ) : (
                      <Button type="submit" className="w-full h-11">
                        Create Account
                      </Button>
                    )}

                    <div className="text-center text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <a
                        href="/login"
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        Sign in
                      </a>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default RegisterPage;
