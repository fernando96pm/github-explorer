import { Switch, Route, Redirect } from "react-router-dom";
import Issues from "./pages/Issues";
import Search from "./pages/Search";
import DataContextProvider from "./store/DataContextProvider";
import { IssueData } from "./entities/IssueData";
import { useState } from "react";
import Issue from "./pages/Issue";
import UserProfile from "./pages/UserProfile";
import Navbar from "./components/NavBar";
import Repository from "./pages/Repository";

// Gestiona las rutas de la aplicación. Cuando se selecciona una issue en la lista para ver los detalles, gestiona los datos de la issue para pasarla como
// propiedad al componente Issue. 
const App = () => {
  const [issue, setIssue] = useState<IssueData>();

  const issueDetailsHandler = (issue: IssueData) => {
    setIssue(issue);
  };

  return (
    <DataContextProvider>
        <Navbar />
        <div className="mt-28 mb-16">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/search" />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route exact path="/issues">
              <Issues type="ISSUE" onDetails={issueDetailsHandler} />
            </Route>
            <Route path="/issues/:id">
              <Issue data={issue} />
            </Route>
            <Route path="/user">
              <UserProfile />
            </Route>
            <Route path="/repository">
              <Repository />
            </Route>
          </Switch>
        </div>
    </DataContextProvider>
  );
};
export default App;
