import type { ActionFunction } from "remix";
import { json } from "remix";
import { Form, useActionData } from "@remix-run/react";
import { fibonacci } from "rust-fibonacci";

export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let number = Number(formData.get("number"));

  return json({ number, result: fibonacci(number) });
};

export default function RustFibonacciServer() {
  let { number, result } = useActionData() || { number: 10 };
  return (
    <main>
      <h1>Rust Fibonacci</h1>
      <p>This is a rust fibonacci implementation running on the server.</p>
      <Form method="post">
        <input type="number" name="number" defaultValue={number} />
        <button type="submit">Submit</button>
      </Form>
      {typeof result === "number" && <p>Result: {result}</p>}
    </main>
  );
}
