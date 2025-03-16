import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
export interface FilterSelectionProps {
    label: string;
    items: string[];
    onValueChange: React.Dispatch<React.SetStateAction<string | undefined> >;
    defaultValue? : string | undefined;
  }
export default function FilterSelection({
    label,
    items,
    onValueChange,
    defaultValue
    }: FilterSelectionProps) 
{
    const handleChange = (value: string) => {
        onValueChange(value);
      };

  return (
    <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">{label}</h1>
        <Select onValueChange={handleChange} value={defaultValue}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an Option" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {items.map((item, index) => (
                    <SelectItem key={index} value={item}>
                        {item}
                    </SelectItem>
                ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
  )
}
