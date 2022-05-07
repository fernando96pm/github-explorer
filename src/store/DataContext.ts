import { createContext } from "react";
import { IssueData } from "../entities/IssueData";
import { GitUser } from '../entities/GitUser';
import { RepositoryData } from "../entities/RepositoryData";

// El contexto gestiona los datos de las issues, el usuario y el repositorio. Incluye una función para resetear los datos.
type dataContextType = {
    issues: IssueData[];
    gitUser: GitUser | null,
    repository: RepositoryData | null,
    updateIssues: (issues: IssueData[]) => void,
    setGitUser: (user: GitUser) => void,
    setRepository: (repository: RepositoryData) => void,
    resetData: () => void

}
const DataContext = createContext<dataContextType>({
    issues: [],
    gitUser: null,
    repository: null,
    updateIssues: (issues) => {},
    setGitUser: (user: GitUser) => {},
    setRepository: (repository: RepositoryData) => {},
    resetData: () => {}
})
export default DataContext

