import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AppContext } from "./Context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const AppContextConsumer = useContext(AppContext)
  if (!AppContextConsumer)
    throw new Error ("invalid scope")
  const {search, setSearch, formula} = AppContextConsumer
  const [error, setError] = useState<boolean>(false)
  const navigate = useNavigate();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    if (value.length >= 3) {
        setSearch(value);
    }
    else {
        setSearch("");
    }
};
const handleRedirect = ()=>{
  if (search.length >= 3){
   const query = `AND(${Object.values(formula).join(',')})`
    navigate(`/organizations?filter=${query}`)
  }
  else
    setError(true)

}
  return (
    <div className="md:w-[600px] relative h-[50px]">
        <input
        type="text"
        className={`bg-transparent outline-none ${error? 'border-red-600' :'border-black/40' }  border w-full h-[40px] px-4 py-2 pr-[90px] rounded-3xl  font-light focus:border-black transition-all duration-100 `}
        placeholder="Enter a Company Name"
        onChange={handleInputChange}
        onFocus={()=>{
          setError(false)
        }}
        />
        <div className={`absolute right-0 top-0 h-[40px] flex items-center justify-center w-[90px] rounded-r-3xl ${error? 'bg-red-600' :'bg-black/80' }  text-white cursor-pointer  `} onClick={handleRedirect}>
            <FaSearch className="w-5 h-5" />
        </div>
        <p className={` ${error? 'block' : 'hidden'} ml-5 text-red-600 font-light`}>Please enter at least 3 characters</p>
    </div>
  )
  
}
