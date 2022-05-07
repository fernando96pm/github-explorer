import { FC } from "react";
import { DataLabel } from "../entities/IssueData";
import { IssueData } from "../entities/IssueData";
import { Link } from "react-router-dom";
import { FaCommentAlt } from "react-icons/fa";
import { GoGitPullRequest } from "react-icons/go";

// Componente que muestra los datos para cada issue, dentro de la lista de issues. 
// Contiene un link asociado al botón 'Details' que redirige hacia los detalles de la issue seleccionada.
// La función que recibe a través de las props (onDetails) se encarga de enviar los datos al componentes App, pasando primero
// por Issues, para establecer los datos de la issue seleccionada y poder mostrarlos en el componente 'Issue' cuando se produzca la redirección.

const DataItem: FC<{
  data: IssueData;
  title: string;
  username: string;
  isPull: boolean;
  createdAt: string;
  labels: DataLabel[];
  commentsCount: number;
  urlPull: string | undefined;
  onDetails: (data: IssueData) => void;
}> = ({
  data,
  title,
  username,
  isPull,
  createdAt,
  labels,
  commentsCount,
  urlPull,
  onDetails,
}) => {
  const detailsHandler = () => {
    onDetails(data);
  };
  // url de redirección
  let redirectUrl = `/issues/${data.id}`;

  return (
    <div className="py-2 text-center flex-col">
      <div className="basis-full mt-2 text-xl font-bold overflow-hidden overflow-ellipsis">
        <span className="whitespace-nowrap overflow-ellipsis">{title}</span>
      </div>
      <div className="basis-full flex justify-around my-6 mx-6">
        <div className="basis-1/2 flex">
        <p>Author:</p><p className="italic text-base font-semibold text-left ml-4">
          {username}
          </p>
        </div>
        <div className="basis-1/2">
          <p className="w-full text-base text-right">Created at: {createdAt}</p>
        </div>
      </div>
      {isPull && (
        <div className="flex-col">
          <div className="flex justify-start gap-4 overflow-hidden overflow-ellipsis pl-4">
            <GoGitPullRequest className="text-4xl mt-0" />
            <p className="font-semibold text-base mt-2 mr-6 text-left">
              Pull request
            </p>
          </div>
          <div className='overflow-hidden overflow-ellipsis mb-4'>
            
          <a
            className="text-sm sm:text-base ml-3 mt-3 text-blue-600 text-left w-full block overflow-auto"
            href={urlPull}
            >
            {urlPull}
          </a>
            </div>
        </div>
      )}
      <div className="basis-full mb-6 text-sm text-white flex justify-end gap-1 mx-auto flex-wrap">
        {labels.map((label) => (
          <span className="px-3 py-0.5 pb-1 self-center rounded-xl bg-blue-500 bg-opacity-[0.5] shadow-md">
            {label.name}
          </span>
        ))}
      </div>
      <div className="flex w-full justify-between px-5 pb-2">
        <div className="flex">
          <FaCommentAlt
            style={{ color: "#F9B651", marginTop: '5px' }} />
          <span>{commentsCount}</span>
        </div>
        <div className="flex justify-end">
          <Link to={redirectUrl}>
            <button
              className="px-5 py-1 bg-slate-900 border-black rounded-2xl text-base"
              onClick={detailsHandler}
            >
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default DataItem;
