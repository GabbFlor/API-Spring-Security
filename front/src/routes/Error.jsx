import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  console.error(error); // Log para ver o erro no console

  return (
    <div>
      <h1>Oops! Página não encontrada.</h1>
      <p>Desculpe, a página que você está tentando acessar não existe.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default Error;
