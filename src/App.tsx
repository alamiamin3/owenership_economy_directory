import Filter from "./components/Filter";
import Search from "./components/Search";
import { IoFilterOutline } from "react-icons/io5";
function App() {

  return (
    <div className="flex flex-col items-center justify-center min-h-svh w-full font-poppins bg-gradient-to-r from-violet-200 to-pink-200">
      <div className="text-black flex flex-col gap-6 justify-center">
          <h1 className="text-3xl font-semibold">Explore A Variety Of Organizations Within The Ownership Economy </h1>
          <div className="self-center flex gap-6 items-center">
            <Search/>
            <Filter/>
          </div>
      </div>
    </div>
  )
}

export default App
