import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { IoFilterOutline } from "react-icons/io5";
export default function Filter() {
  return (
    <Dialog>
    <DialogTrigger>
       <div className="cursor-pointer">
         <IoFilterOutline size={40}/>
       </div>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Filter Companies</DialogTitle>
        <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
        </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Organization type</h1>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select an Option" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </DialogContent>
    </Dialog>

  )
}
