import type { FormEvent } from "react";
import { useState } from "react";

import initWasm, { fibonacci } from "rust-fibonacci";
import wasmBinary from "rust-fibonacci/binary.wasm";

let initWasmPromise: ReturnType<typeof initWasm>;
if (typeof document !== "undefined") {
  initWasmPromise = initWasm(wasmBinary);
}

export default function RustFibonacciBrowser() {
  let [result, setResult] = useState<number | null>(null);
  let handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let number = Number(formData.get("number"));

    await initWasmPromise;
    setResult(fibonacci(number));
  };

  return (
    <main>
      <h1>Rust Fibonacci</h1>
      <p>This is a rust fibonacci implementation running in the browser.</p>
      <form onSubmit={handleSubmit}>
        <input type="number" name="number" defaultValue={10} />
        <button type="submit">Submit</button>
      </form>
      {typeof result === "number" && <p>Result: {result}</p>}
    </main>
  );
}
