import { FC, Fragment, useContext } from "react";
import DataContext from "../store/DataContext";
import DataItem from "../components/DataItem";
import { IssueData } from "../entities/IssueData";
import { useState, useEffect } from "react";
import "./Issues.css";

// Componente que muestra las Issues, realizando una paginación de 5 en 5.  
const Issues: FC<{
  onDetails: (data: IssueData) => void;
  type: string;
}> = ({ onDetails }) => {
  const ctx = useContext(DataContext);
  let content: IssueData[] = ctx.issues

  // Gestión de los elementos de paginación. 
  const step = 5;
  const [infoText, setInfoText] = useState<string>("");
  const [items, setItems] = useState<IssueData[]>(content.slice(0, step));
  const [current, setCurrent] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const isFirstPage = page === 1;

  const nextPage = () => {
    setCurrent((prevPosition) => (prevPosition += step));
    setPage((prevPage) => {
      return prevPage + 1;
    });
  };
  const previousPage = () => {
    setIsLastPage(false);
    let startPosition: number = current - step;
    if (startPosition < 0) {
      return;
    }
    setCurrent(startPosition);
    setPage((prevPage) => {
      return prevPage - 1;
    });
  };
  const firstPage = () => {
    setCurrent(0);
    setPage(1);
    setIsLastPage(false);
  };
  const lastPage = () => {
    setIsLastPage(true);
    let i: number,
      j: number,
      indexPage: number = 0;

    for (i = 0, j = 0; i < content.length; i++, j++) {
      if (j === step) {
        indexPage++;
        j = 0;
      }
      if (step > content.length - i) {
        setCurrent(i);
        break;
      }
    }
    setPage(indexPage);
  };

  // Evalúa el número de items a mostrar en la última página.
  useEffect(() => {
    let endPosition: number = current + step;
    if (endPosition >= content.length) {
      setIsLastPage(true);
      setItems(content.slice(current - step, content.length - 1));
    }
    setItems(content.slice(current, endPosition));
  }, [current, content]);

  // Si no hay Issues, se mostrará un mensaje.
  useEffect(() => {
    if (items.length === 0) {
        setInfoText(`Unable to display issues data.`);
    }
  }, [items]);
  
  if (infoText.trim() !== "") {
    return (
      <p className="text-center text-lg font-semibold mt-48 text-gray-800">
        {infoText}
      </p>
    );
  }
  let nextSimbol = ">",
    prevSimbol = "<",
    firstSimbol = "|<",
    lastSimbol = ">|";

  return (
    <section className="mb-10">
      <h2 className="text-2xl text-center font-semibold text-gray-800 tracking-wide mt-4">
        Issues
      </h2>
      <div className="bg-white dark:bg-black w-[95%] md:w-[65%] border-slate-600 rounded-2xl shadow-slate-400 shadow-sm mx-auto mt-4 md:mt-6 p-4">
        <div>
          {items.map((issue) => (
            <Fragment>
              <DataItem
                onDetails={onDetails}
                data={issue}
                title={issue.title}
                username={issue.username}
                createdAt={issue.created_at}
                labels={issue.labels}
                commentsCount={issue.commentsCount!}
                isPull={issue.isPull}
                urlPull={issue.urlPullRequest}
              />
              <div className="w-[100%] h-[1px] bg-slate-300 mx-auto" />
            </Fragment>
          ))}
        </div>
        <div className="font-semibold flex justify-center pt-4">
          <button
            className="page-button"
            disabled={isFirstPage}
            onClick={firstPage}
          >
            {firstSimbol}
          </button>
          <button
            className="page-button"
            disabled={isFirstPage}
            onClick={previousPage}
          >
            {prevSimbol}
          </button>
          <button
            className="page-button"
            disabled={isLastPage}
            onClick={nextPage}
          >
            {nextSimbol}
          </button>
          <button
            className="page-button"
            disabled={isLastPage}
            onClick={lastPage}
          >
            {lastSimbol}
          </button>
        </div>
        <p className="text-center mt-3">{page}</p>
      </div>
    </section>
  );
};
export default Issues;
