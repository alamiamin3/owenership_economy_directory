import Search from './Search'
import Filter from './Filter'

export default function Home() {
  return (
      <div className="text-black flex flex-col gap-6 justify-center text-center">
          <h1 className="text-xl md:text-3xl font-semibold">Explore A Variety Of Organizations Within The Ownership Economy </h1>
          <div className="self-center flex gap-6 items-center ">
            <Search/>
            <Filter/>
          </div>
      </div>
  )
}
