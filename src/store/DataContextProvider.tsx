import React, { FC, useState } from "react";
import { IssueData } from "../entities/IssueData";
import DataContext from "./DataContext";
import { GitUser } from '../entities/GitUser';
import { RepositoryData } from "../entities/RepositoryData";

const DataContextProvider: FC<{ children: React.ReactNode}> = ({ children }) => {

    const [issues, setIssues] = useState<IssueData[]>([])
    const [user, setUser] = useState<GitUser | null>(null)
    const [repository, setRepository] = useState<RepositoryData | null>(null)

    const updateIssues = (updatedIssues: IssueData[]) => setIssues(updatedIssues)
    const setUserHandler = (gitUser: GitUser) => setUser(gitUser)
    const setRepositoryHandler = (repository: RepositoryData) => setRepository(repository)

    const resetData = () => {
        setIssues([])
        setUser(null)
        setRepository(null)
    }
   
    const contextValue = {
        issues: issues,
        gitUser: user,
        repository: repository,
        updateIssues: updateIssues,
        setGitUser: setUserHandler,
        setRepository: setRepositoryHandler,
        resetData: resetData,
    }
    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContextProvider