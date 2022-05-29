import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main>
      <h1>Remix App!</h1>
      <ul>
        <li>
          <Link to="/rust-fibonacci-browser">Rust Fibonacci Browser</Link>
        </li>
        <li>
          <Link to="/rust-fibonacci-server">Rust Fibonacci Server</Link>
        </li>
      </ul>
    </main>
  );
}
