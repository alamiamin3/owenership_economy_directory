import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

interface FilterSelectionProps {
    label: string;
    items: string[];
    onValueChange: (value: string) => void;
  }
export default function FilterSelection({
    label,
    items,
    onValueChange}: FilterSelectionProps) 
{
  return (
    <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">{label}</h1>
        <Select onValueChange={onValueChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an Option" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Organization type</SelectLabel>
                {items.map((item, index) => (
                    <SelectItem key={index} value={item}>
                        {item}
                    </SelectItem>
                ))}
                {/* <SelectItem value="Cooperative">Cooperative</SelectItem>
                <SelectItem value="Employee-Owned Company">Employee-Owned Company</SelectItem>
                <SelectItem value="DAO">DAO</SelectItem>
                <SelectItem value="Crypto/Web3 ">Crypto/Web3 </SelectItem>
                <SelectItem value="ESOP">ESOP</SelectItem>
                <SelectItem value="Platform Cooperative">Platform Cooperative</SelectItem>
                <SelectItem value="Community Trust">Community Trust</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="Other">Other</SelectItem> */}
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
  )
}
