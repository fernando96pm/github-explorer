import { IssueData } from "../entities/IssueData";
import { FC, useEffect, useState } from "react";
import Comment from "../components/Comment";
import { LoadingSpinner } from "../ui/Spinner";
import { FaCommentAlt } from "react-icons/fa";

// Componente que muestra los detalles de cada Issue. Al renderizarse por primera vez, realiza la petición para obtener los comentarios.

// Tipo del comentario.
export type CommentType = {
  body: string;
  user: {
    login: string;
  };
  reactions: {
    "+1": number;
    "-1": number;
  };
};
const Issue: FC<{ data: IssueData | undefined }> = ({ data }) => {
  const [comments, setComments] = useState<CommentType[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMessages = () => {
    setLoading(true);
    fetch(data!.comments_url)
      .then((response) => response.json())
      .then((data: CommentType[]) => {
        setComments(data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="flex-col justify-center">
      <div className="bg-zinc-50 w-[95%] md:w-[65%] border-slate-600 rounded-2xl shadow-slate-400 shadow-sm mx-auto mt-16 md:mt-16 p-4 max-w-[550px]">
        <div className="flex-col p-3">
          <span className="font-semibold text-xl text-cyan-700 text-left ml-0">
            #{data!.id}
          </span>
          <div className="basis-full mt-2 font-bold text-2xl flex-wrap">
            <h3 className="text-center overflow-ellipsis">{data!.title}</h3>
          </div>
          <div className="w-[100%] h-[1px] bg-slate-300 mx-auto my-4" />
          <div className="basis-full flex justify-center mt-2 text-lg">
              Author:
              <p className="ml-2 italic text-center text-gray-800 font-semibold text-lg">
                {data!.username}
              </p>
          </div>
          <div>
            <div className="p-2 basis-2/3 mt-3 text-lg overflow-hidden overflow-ellipsis">
              Url:
              <a
                className="ml-2 text-base mx-3m text-blue-600"
                href={data!.url}
              >
                {data!.url}
              </a>
            </div>
            <div className="p-2 mt-3 flex justify-around">
              <p className="text-lg text-gray-700">
                Created at: {data!.created_at}
              </p>
              <p className="text-lg text-gray-700">
                Last update: {data!.updated_at}
              </p>
            </div>
            <div className="p-2 mt-3 flex justify-center">
              {data!.open ? (
                <p className="text-green-600 text-lg font-bold">Open</p>
              ) : (
                <p className="text-red-600 text-lg font-bold">Close</p>
              )}
            </div>
          </div>
          <div className="basis-full my-3 text-sm text-white flex gap-1 mx-auto flex-wrap justify-end">
            {data!.labels.map((label) => (
              <span className="px-3 py-0.5 pb-1 self-center rounded-xl bg-blue-500 bg-opacity-[0.5] shadow-md">
                {label.name}
              </span>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <FaCommentAlt
              style={{ color: "#F9B651", fontSize: "24px", marginTop: "4px" }}
            />
            <span className="text-lg">{comments?.length}</span>
          </div>
        </div>
      </div>
      <div className="flex-col mx-auto w-[95%] md:w-[80%] mb-5">
        {loading && (
          <div className="w-full flex justify-center">
            <LoadingSpinner />
          </div>
        )}
        {comments?.map((comment) => (
          <>
            <Comment comment={comment} />
            <div className="w-[90%] h-[1px] bg-slate-300 mx-auto" />
          </>
        ))}
      </div>
    </div>
  );
};
export default Issue;
