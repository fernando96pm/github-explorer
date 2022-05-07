import { useContext } from "react";
import DataContext from "../store/DataContext";

// Muestra los datos de un repositorio.
const Repository = () => {
  const ctx = useContext(DataContext);
  const repository = ctx.repository;

  let content = repository ? (
    <div className="bg-zinc-50 dark:bg-black w-[95%] md:w-[65%] border-slate-600 rounded-2xl shadow-slate-400 shadow-sm mx-auto mt-16 p-4 mb-4 md:mb-3 max-w-[550px]">
      <p className="m-4 text-xl font-bold text-slate-700">#{repository?.id}</p>

      <h2 className="text-center font-bold text-2xl my-8">
        {repository?.full_name}
      </h2>
      <div className="w-[90%] h-[1px] bg-slate-300 mx-auto mt-8 mb-4" />
      
      <div className="md:flex md:justify-around flex-wrap ">
        <p className="text-lg font-medium text-center mt-2">
          Created at:
          <span className="text-lg font-bold">{repository?.created_at}</span>
        </p>
        <p className="text-lg font-medium text-center mt-2">
          Last update:
          <span className="text-lg font-bold">{repository?.updated_at}</span>
        </p>
      </div>

      <div className="flex justify-around my-4 ">
        <p className="text-lg font-medium">
          Open issues:
          <span className="text-lg font-bold">{repository?.open_issues}</span>
        </p>
        <p className="text-lg font-medium">
          Forks:<span className="text-lg font-bold">{repository?.forks}</span>
        </p>
      </div>
      <div className="basis-full overflow-auto my-4 mx-auto flex justify-center">
        <p>
          <a
            className="text-sm sm:text-base lg:text-lg mx-3 text-blue-600"
            href={repository?.url}
          >
            {repository?.url}
          </a>
        </p>
      </div>
    </div>
  ) : (
    <p className="text-center text-lg font-semibold mt-48 text-gray-800">
      Unable to display repository data.
    </p>
  );
  return content;
};
export default Repository;
