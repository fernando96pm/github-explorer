import { FC } from "react";
import { CommentType } from "../pages/Issue";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

// Componente encargado de pintar los datos de los comentarios de las issues.
// Se indica el nombre de usuario, el mensaje y las reacciones.

const Comment: FC<{ comment: CommentType }> = ({ comment }) => {
  return (
    <div className="flex-col bg-slate-50 w-[95%] md:w-[80%] mx-auto p-6 rounded-md mt-1">
      <p className="font-semibold text-lg mx-auto mb-3">{comment.user.login}</p>
      <p className="mx-auto text-sm text-left overflow-auto">{comment.body}</p>
      <div className="mt-4 mb-0 flex">
        <FaThumbsUp className="mx-4 text-lg text-green-600" />{" "}
        {comment.reactions["+1"]}{" "}
        <FaThumbsDown className="mx-4 text-lg text-red-600" />{" "}
        {comment.reactions["-1"]}
      </div>
    </div>
  );
};
export default Comment;
