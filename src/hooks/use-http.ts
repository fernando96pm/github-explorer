import { useContext, useState } from "react";
import { IssueData } from "../entities/IssueData";
import DataContext from "../store/DataContext";
import { DataLabel } from "../entities/IssueData";
import { GitUser } from "../entities/GitUser";
import { useHistory } from "react-router";
import { RepositoryData } from "../entities/RepositoryData";
// Hook personalizado que gestiona las llamadas a la API, así como el estado de carga y la gestión de errores.
// Devuelve tres funciones para realizar las 3 peticiones que realiza la aplicación al ingresar los datos: usuario, repositorio y issues/pull request.
// También devuelve el estado de carga, de error, de finalización de las peticiones y una función para resetear el estado del error y de finalización.

// Como apunte, sólo se indicará como error cuando la respuesta a la petición del usuario no sea correcta, ya sea porque no existe o por otro motivo, especificando ambos casos.
// De esta forma, el usuario puede realizar una búsqueda aunque el repositorio no exista, para poder ver la información del usuario. 
// De igual forma con las issues, se da la opción al usuario de explorar un perfil de usuario y un repositorio aunque no tenga Issues.

// Definición de tipo del campo 'pull_request' incluido en la respuesta si se trata de un Pull request.
type PullRequestType = { url: string };
// Definición del tipo de respuesta en la petición de Issues
type ResponseDataType = {
  id: number;
  title: string;
  url: string;
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    url: string;
  };
  state: string;
  labels: DataLabel[];
  comments: number | undefined;
  comments_url: string;
  review_comments_url: string;
  pull_request: PullRequestType | undefined;
};

const useHttp = () => {
  const ctx = useContext(DataContext);
  const history = useHistory();
  const [userError, setUserError] = useState<boolean>(false);
  const [loadUser, setLoadUser] = useState<boolean>(false);
  const [loadRepo, setLoadRepo] = useState<boolean>(false);
  const [loadIssues, setLoadIssues] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const resetErrorHandler = () => {
    setUserError(false);
    setCompleted(false);
    history.push("/search");
  };
  // Petición de usuario
  const getUser = (username: string) => {
    setCompleted(false);
    setUserError(false);
    setLoadUser(true);
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((data: GitUser) => {
        let user: GitUser = new GitUser(
          data.id,
          data.login,
          data.avatar_url,
          data.followers,
          data.following,
          data.email,
          data.name,
          data.public_repos
        );
        ctx.setGitUser(user);
        setUserError(false);
        setLoadUser(false);
      })
      .catch(() => {
        setLoadUser(false);
        setUserError(true);
      });
  };
  // Petición de repositorio
  const getRepository = (username: string, repository: string) => {
    setCompleted(false);
    setLoadRepo(true);
    fetch(`https://api.github.com/repos/${username}/${repository}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((data: RepositoryData) => {
        let repository: RepositoryData = new RepositoryData(
          data.id,
          data.full_name,
          data.forks,
          data.created_at,
          data.updated_at,
          data.visibility,
          data.url,
          data.open_issues
        );
        ctx.setRepository(repository);
      })
      .finally(() => {
        setLoadRepo(false);
      });
  };
  // Petición de issues
  const getIssues = (username: string, repository: string) => {
    setCompleted(false);
    setLoadIssues(true);
    let updatedData: IssueData[] = [];

    fetch(`https://api.github.com/repos/${username}/${repository}/issues`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return;
      })
      .then((data: ResponseDataType[]) => {
        for (const key in data) {
          let open = data[key].state === "open" ? true : false;
          let isPull = data[key].pull_request ? true : false;
          const newEntry = new IssueData(
            data[key].id,
            data[key].title,
            data[key].url,
            data[key].user.login,
            data[key].created_at,
            data[key].updated_at,
            open,
            data[key].labels,
            data[key].comments,
            data[key].comments_url,
            isPull,
            data[key].pull_request?.url
          );
          updatedData.push(newEntry);
        }
        ctx.updateIssues(updatedData);
        setLoadIssues(false);
      })
      .finally(() => {
        setLoadIssues(false);
        setCompleted(true);
      });
  };

  const isLoading = loadUser || loadRepo || loadIssues;

  return {
    completed,
    userError,
    isLoading,
    resetErrorHandler,
    getIssues,
    getUser,
    getRepository,
  };
};
export default useHttp;
