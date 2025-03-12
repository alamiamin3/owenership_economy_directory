import { FaSearch } from "react-icons/fa";

export default function Search() {
  return (
    <div className="w-[600px] relative ">
        <input
        type="text"
        className="bg-transparent outline-none border-black/40 border w-full h-[40px] px-4 py-2 pr-[90px] rounded-3xl  font-light focus:border-black transition-all duration-100 "
        placeholder="Enter a Company Name"
        />
        <div className="absolute right-0 top-0 h-full flex items-center justify-center w-[90px] rounded-r-3xl bg-black/80 text-white cursor-pointer  ">
            <FaSearch className="w-5 h-5" />
        </div>
    </div>
  )
}
