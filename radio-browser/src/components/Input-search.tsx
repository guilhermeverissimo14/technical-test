import { Search } from "lucide-react";

interface InputSearchProps {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputSearch = ({ placeholder, value, onChange }: InputSearchProps) => {
    return (
        <div className="bg-[#4c4c55] flex items-center gap-2 rounded-sm  p-1  hover:border-2 hover:border-white">

            <Search className="text-white" />
            <input
                className="bg-transparent w-full text-white outline-none p-1"
                placeholder={placeholder}
                type="text"
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default InputSearch;