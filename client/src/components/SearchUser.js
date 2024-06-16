import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import CircularCoding from "./CircularCoding";
import UserSearchCard from "./UserSearchCard";

const SearchUser = () => {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  const handleSearchClick = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/searchUser/${data}`;

      if (data !== "") {
        const response = await fetch(URL, {
          method: "GET",
        });

        const responseData = await response.json();
        setSearchUser(responseData);
      }
      if (data === "") {
        setSearchUser([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOnChange = (e) => {
    setData(e.target.value);
  };

  useEffect(() => {
    handleSearchClick();
  }, [data]);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40">
      <div className="w-full max-w-lg mx-auto mt-10 m-2">
        {/* input search user */}
        <div className="bg-white rounded h-14 overflow -hidden flex">
          <input
            type="text"
            placeholder="Search user by name, email......"
            className="w-full outline-none py-1 h-full px-4"
            value={data}
            onChange={(e) => handleOnChange(e)}
          ></input>
          <div
            className="h-14 w-14 flex justify-center items-center"
            // onClick={(e) => handleSearchClick(e)}
          >
            <IoSearchOutline size={25} />
          </div>
        </div>

        {/* display search user */}
        <div className="bg-white mt-2 w-full p-4 rounded">
          {/* no user found */}
          {searchUser.length === 0 && !loading && (
            <p className="text-center text-slate-500">No user found !</p>
          )}

          {loading && <CircularCoding />}
          {searchUser.length !== 0 &&
            !loading &&
            searchUser.map((user, index) => {
              return <UserSearchCard key={user._id} user={user} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
