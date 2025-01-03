import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  // get an error message from Router
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
