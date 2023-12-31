"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { toast } from "components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
} from "components/ui/select";
import Link from "next/link";
import { SelectValue } from "@radix-ui/react-select";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

function Components() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <main className="flex min-h-screena flex-col items-center justify-center bg-surfaceT-400">
      {/* Buttons */}
      <div className="m-10 mx-[20%] grid gap-4 rounded bg-surfaceT-200 p-4 outline-dashed outline-2 outline-[#9747FF] sm:grid-cols-3 lg:grid-cols-5">
        {/* rounded  */}
        <Button>Button</Button>
        <Button variant={"secondary"}>Button</Button>
        <Button variant={"error"}>Button</Button>
        <Button variant={"success"}>Button</Button>
        <Button variant={"warning"}>Button</Button>
        {/* rounded secondar  */}
        <Button appearance={"secondary"}>Button</Button>
        <Button variant={"secondary"} appearance={"secondary"}>
          Button
        </Button>
        <Button variant={"error"} appearance={"secondary"}>
          Button
        </Button>
        <Button variant={"success"} appearance={"secondary"}>
          Button
        </Button>
        <Button variant={"warning"} appearance={"secondary"}>
          Button
        </Button>
        {/* semiRounded  */}
        <Button shape={"semiRounded"}>Button</Button>
        <Button variant={"secondary"} shape={"semiRounded"}>
          Button
        </Button>
        <Button variant={"error"} shape={"semiRounded"}>
          Button
        </Button>
        <Button variant={"success"} shape={"semiRounded"}>
          Button
        </Button>
        <Button variant={"warning"} shape={"semiRounded"}>
          Button
        </Button>
        {/* semiRounded secondary */}
        <Button appearance={"secondary"} shape={"semiRounded"}>
          Button
        </Button>
        <Button
          variant={"secondary"}
          appearance={"secondary"}
          shape={"semiRounded"}
        >
          Button
        </Button>
        <Button
          variant={"error"}
          appearance={"secondary"}
          shape={"semiRounded"}
        >
          Button
        </Button>
        <Button
          variant={"success"}
          appearance={"secondary"}
          shape={"semiRounded"}
        >
          Button
        </Button>
        <Button
          variant={"warning"}
          appearance={"secondary"}
          shape={"semiRounded"}
        >
          Button
        </Button>
        {/* rectangle  */}
        <Button shape={"rectangle"}>Button</Button>
        <Button variant={"secondary"} shape={"rectangle"}>
          Button
        </Button>
        <Button variant={"error"} shape={"rectangle"}>
          Button
        </Button>
        <Button variant={"success"} shape={"rectangle"}>
          Button
        </Button>
        <Button variant={"warning"} shape={"rectangle"}>
          Button
        </Button>
        {/* rectangle secondary */}
        <Button appearance={"secondary"} shape={"rectangle"}>
          Button
        </Button>
        <Button
          variant={"secondary"}
          appearance={"secondary"}
          shape={"rectangle"}
        >
          Button
        </Button>
        <Button variant={"error"} appearance={"secondary"} shape={"rectangle"}>
          Button
        </Button>
        <Button
          variant={"success"}
          appearance={"secondary"}
          shape={"rectangle"}
        >
          Button
        </Button>
        <Button
          variant={"warning"}
          appearance={"secondary"}
          shape={"rectangle"}
        >
          Button
        </Button>
      </div>
      {/* Form */}
      <div className="m-10 mx-[20%] grid grid-cols-1 gap-4 rounded bg-gradient-to-b from-surfaceT-200 to-primaryT-200 p-4 outline-dashed outline-2 outline-[#9747FF] ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="min-w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      error={fieldState.error}
                      placeholder="Type your username"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Type your password"
                      error={fieldState.error}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your password.</FormDescription>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger ref={field.ref}>
                        <SelectValue placeholder="Select a verified email to display"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectSeparator />
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectSeparator />
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage email addresses in your{" "}
                    <Link href="#">email settings</Link>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      {/* Select */}
      <div className="m-10 mx-[20%] grid grid-cols-1 gap-4 rounded bg-gradient-to-b from-surfaceT-200 to-primaryT-200 p-4 outline-dashed outline-2 outline-[#9747FF] "></div>
    </main>
  );
}

export default Components;
