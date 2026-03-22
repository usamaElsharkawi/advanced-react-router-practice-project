import { useRouteError } from "react-router-dom";
export default function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <h1>An error occurred!</h1>
      <p>{error.message}</p>
      <p>{error.status}</p>
    </>
  );
}
