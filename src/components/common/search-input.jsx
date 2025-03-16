import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export const SearchInput = ({ placeholder, onSearch }) => {
    <div className="flex items-center w-full max-w-sm space-x-2 rounded-lg border border-gray-300 bg-gray-50 dark:bg-gray-900 px-3.5 py-2"
        onChange={(e) => onSearch(e.target.value)}>
        <SearchIcon className="h-4 w-4" />
        <Input type="search" placeholder={placeholder} className="w-full border-0 h-8 font-semibold" />
    </div>
}