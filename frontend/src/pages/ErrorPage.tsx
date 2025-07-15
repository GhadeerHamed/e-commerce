import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div>
      <main className="prose p-5">
        <h1>Oops...</h1>
        {isRouteErrorResponse(error)
          ? "The requested page was not found."
          : (error as Error).message}
      </main>
    </div>
  );
};

export default ErrorPage;
