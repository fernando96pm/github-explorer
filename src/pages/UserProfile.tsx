import { useContext } from "react";
import DataContext from "../store/DataContext";
import "./UserProfile.css";

// Muestra los datos de un usuario.
const UserProfile = () => {
  const ctx = useContext(DataContext);
  const user = ctx.gitUser;

  let content = user ? (
    <div className="bg-zinc-50 dark:bg-black w-[95%] md:w-[65%] border-slate-600 rounded-2xl shadow-slate-400 shadow-sm mx-auto mt-24 p-4 max-w-[550px]">
      <p className="mt-4 ml-4 text-xl font-bold text-slate-700">#{user?.id}</p>
      <div className="flex justify-center">
        <img className="image" src={user?.avatar_url} alt="new" />
      </div>
      <h2 className="text-center font-bold text-2xl my-8">{user?.login}</h2>
      <div className="w-[90%] h-[1px] bg-slate-300 mx-auto mt-8 mb-4" />
      <div className="md:flex md:justify-around flex-wrap ">
        <p className="text-lg font-medium text-center mt-2">
          Followers:
          <span className="font-extrabold text-lg ">{user?.followers}</span>
        </p>
        <p className="text-lg font-medium text-center mt-2">
          Following:
          <span className="font-extrabold text-lg">{user?.following}</span>
        </p>
      </div>
        <p className="text-lg font-medium text-center my-4">
          Public repositories:{" "}
          <span className="font-extrabold text-xl">{user?.public_repos}</span>
        </p>

      <div className="flex justify-around mt-6">
        {user?.name && (
          <p className="text-lg font-medium">
            Name: <span className="font-extrabold text-lg"> {user!!.name}</span>
          </p>
        )}
        {user?.email && <p>Email: {user?.email}</p>}
      </div>
    </div>
  ) : (
    <p className="text-center text-lg mt-48 font-semibold text-gray-800">
      Enter a user and a repository to get started.
    </p>
  );
  return content;
};
export default UserProfile;
