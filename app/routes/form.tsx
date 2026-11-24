import { valibotResolver } from "@hookform/resolvers/valibot";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import * as v from "valibot";

import type { Route } from "./+types/form";
import { useFetcher } from "react-router";

const FormSchema = v.object({
  email: v.pipe(v.string(), v.nonEmpty(), v.email()),
});

type FormValues = v.InferInput<typeof FormSchema>;

export function clientAction() {
    console.log("HERE")
  return {
    formErrors: ["help"],
  };
}

export default function FormRoute({ actionData }: Route.ComponentProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
    resolver: valibotResolver(FormSchema, undefined, {
      raw: true,
    }),
  });
  const fetcher = useFetcher()

  const onSubmit: SubmitHandler<FormValues> = (data) => fetcher.submit(data);

  return (
    <fetcher.Form onSubmit={handleSubmit(onSubmit)}>
      {actionData?.formErrors.map((error) => (
        <p>{error}</p>
      ))}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              aria-invalid={errors.email ? "true" : "false"}
              {...field}
            />
            {errors.email && <p role="alert">{errors.email.message}</p>}
          </>
        )}
      />

      <button type="submit">Submit</button>
    </fetcher.Form>
  );
}
