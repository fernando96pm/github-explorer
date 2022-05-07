import {
  ChangeEvent,
  FormEvent,
  Fragment,
  useContext,
  useEffect,
  useState,
} from 'react'
import DataContext from '../store/DataContext'
import useHttp from '../hooks/use-http'
import Card from '../ui/Card'
import './Search.css'
import { LoadingSpinner } from '../ui/Spinner'
import { useHistory } from 'react-router'

// Componente de búsqueda. Verifica que el usuario haya introducido ambos campos y utiliza el custom hook 'use-http' para realizar las peticiones.
// En caso de petición correcta, redirige al componente Issues. En caso contrario mostrará un mensaje advirtiendo del error y volverá a pedir los datos.

const Search = () => {
  // Gestión de datos introducidos y validación de campo nulo si se ha puesto el foco y es un dato inválido.
  const [enteredUsername, setEnteredUsername] = useState<string>('')
  const [enteredRepository, setEnteredRepository] = useState<string>('')
  const [usernameTouched, setUsernameTouched] = useState<boolean>(false)
  const [repositoryTouched, setRepositoryTouched] = useState<boolean>(false)

  // hook use-http
  const {
    completed,
    userError,
    isLoading,
    resetErrorHandler,
    getIssues,
    getUser,
    getRepository,
  } = useHttp()

  const ctx = useContext(DataContext)
  const history = useHistory()

  const usernameValid = enteredUsername.trim().length > 0
  const repositoryValid = enteredRepository.trim().length > 0

  const formIsValid = usernameValid && repositoryValid

  const usernameHasError = !usernameValid && usernameTouched
  const repositoryHasError = !repositoryValid && repositoryTouched

  // Clases aplicadas en caso de datos incorrectos.
  const usernameClasses = usernameHasError
    ? `${'form-control'} ${'invalid'}`
    : `${'form-control'}`

  const repositoryClasses = repositoryHasError
    ? `${'form-control'} ${'invalid'}`
    : `${'form-control'}`

  const enteredUsernameHandler = (e: ChangeEvent<HTMLInputElement>) => setEnteredUsername(e.target.value)
  const enteredRepositoryHandler = (e: ChangeEvent<HTMLInputElement>) => setEnteredRepository(e.target.value)
  const usernameBlurHandler = () => setUsernameTouched(true)
  const repositoryBlurHandler = () => setRepositoryTouched(true)

  const formSubmitHandler = (event: FormEvent) => {
    event.preventDefault()
    ctx.resetData()
    sendRequest()
  }

  const sendRequest = () => {
    getUser(enteredUsername)
    getRepository(enteredUsername, enteredRepository)
    getIssues(enteredUsername, enteredRepository)
  }

  // Sólo si la petición se ha realizado correctamente se produce la redirección.
  useEffect(() => {
    if (!isLoading && !userError && completed) {
      history.push('/issues')
    }
  }, [isLoading, userError, completed])

  // Componente en caso de error.
  if (userError) {
    return (
      <Card>
        <div className="flex-col justify-center p-4">
          <h3 className="font-bold text-center text-2xl mb-4">Error</h3>
          <p className="text-center">Something went wrong. Try again.</p>
          <div className="flex justify-center mt-4">
            <button onClick={() => resetErrorHandler()}>OK</button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Fragment>
      <div className="flex-col justify-items text-center p-6">
        <h2 className="text-2xl font-semibold text-gray-800 tracking-wide">
          Search
        </h2>
        <p className="text-lg font-medium text-gray-800 mt-6">
          Explore issues and pull requests for a repository.
        </p>
        <p className="text-lg font-medium text-gray-800">
          Enter a username and repository to get started.
        </p>
      </div>
      <Card>
        <form onSubmit={formSubmitHandler}>
          <div className="flex-col justify-center p-4 w-xs">
            <div className={usernameClasses}>
              <label htmlFor="username">Username</label>
              <input
                className="px-2 py-2 z-0 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pr-10"
                id="username"
                type="text"
                onChange={enteredUsernameHandler}
                onBlur={usernameBlurHandler}
              />
              {usernameHasError && (
                <p style={{ color: '#b40e0e' }}>Username required</p>
              )}
            </div>
            <div className={repositoryClasses}>
              <label htmlFor="repository">Repository</label>
              <input
                className="px-2 z-0 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pr-10"
                id="repository"
                type="text"
                onChange={enteredRepositoryHandler}
                onBlur={repositoryBlurHandler}
              />
              {repositoryHasError && (
                <p style={{ color: '#b40e0e' }}>Repository required</p>
              )}
            </div>
          </div>
          <div className='form-actions'>
            <button disabled={!formIsValid}>Search</button>
          </div>
          {isLoading && (
            <div className="flex justify-center mt-6">
              <LoadingSpinner />
            </div>
          )}
        </form>
      </Card>
    </Fragment>
  )
}

export default Search
