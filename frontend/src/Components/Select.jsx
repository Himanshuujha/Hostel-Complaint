import { useRef, useState, useEffect } from "react";
import { XCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const Select = ({ options, value, onChange, multiple = false }) => {
    const [query, setQuery] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const inputRef = useRef(null);

    const filteredOptions = options.filter(
        (item) =>
            item?.toLocaleLowerCase()?.includes(query.toLocaleLowerCase()?.trim()) &&
            (multiple ? !value?.includes(item) : item !== value)
    );

    const isDisable =
        !query?.trim() ||
        (multiple
            ? value.some(
                (item) =>
                    item?.toLocaleLowerCase()?.trim() === query?.toLocaleLowerCase()?.trim()
            )
            : value === query);

    const handleRemove = (tag) => {
        if (multiple) {
            const newSelected = value?.filter((i) => i !== tag);
            onChange(newSelected);
        } else {
            onChange("");
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.width = ${inputRef.current.value.length + 1}ch;
        }
    }, [query]);

    const handleBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setMenuOpen(false);
        }
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <div className="w-full grid place-items-center mt-1">
            <div className="relative w-full text-sm text-white" onBlur={handleBlur} tabIndex="0">
                <div className="card flex items-center justify-between p-3 w-full gap-2.5">
                    <div className="flex flex-wrap flex-1 items-center gap-1 z-10 bg-transparent">
                        {multiple ? (
                            value?.map((tag) => (
                                <div
                                    key={tag}
                                    className="rounded-full py-1.5 px-3 border border-gray-400 bg-gray-50 text-gray-500 flex items-center gap-2"
                                >
                                    {tag}
                                    <div
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => handleRemove(tag)}
                                    >
                                        <XCircleIcon className="w-4 h-4 cursor-pointer" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            value && (
                                <div className="text-white">
                                    {value}
                                </div>
                            )
                        )}
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={
                                multiple
                                    ? value?.length === 0 && query === ""
                                        ? "Please add your requirements"
                                        : ""
                                    : value?.length === 0 && query === ""
                                        ? "Select Priority"
                                        : ""
                            }
                            className="w-full p-3 bg-transparent border-none text-white rounded-lg resize-none mt-1 flex-1"
                            onClick={toggleMenu}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !isDisable) {
                                    if (multiple) {
                                        const newSelected = [...value, query];
                                        onChange(newSelected);
                                    } else {
                                        onChange(query);
                                    }
                                    setQuery("");
                                }
                            }}
                            style={{ minWidth: "50px", color: "white", height: "30px" }}
                        />
                        <ChevronDownIcon
                            className="w-6 h-7 bg-secondaryBlack text-gray-500 cursor-pointer rounded-lg"
                            onClick={toggleMenu}
                        />
                    </div>
                </div>

                {menuOpen && filteredOptions.length > 0 && (
                    <div className="bg-pink-100 text-black card absolute w-full max-h-52 mt-2 p-1 flex overflow-y-auto custom-scrollbar z-20 border rounded-lg">
                        <ul className="w-full">
                            {filteredOptions?.map((option) => (
                                <li
                                    key={option}
                                    className="p-2 cursor-pointer hover:bg-primaryGrey text-black rounded-md w-full"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => {
                                        if (multiple) {
                                            const newSelected = [...value, option];
                                            onChange(newSelected);
                                        } else {
                                            onChange(option);
                                        }
                                        setQuery("");
                                        setMenuOpen(false);
                                    }}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Select;