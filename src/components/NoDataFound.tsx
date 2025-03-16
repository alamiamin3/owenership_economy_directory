import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function NoDataFound() {
  return (
    <div className="self-center flex flex-col justify-center items-center gap-5">
        <h1 className="text-2xl font-semibold">No Result Found</h1>
        <Button>
            <Link to='/'>Go Back Home</Link>
        </Button>
    </div>
  )
}
