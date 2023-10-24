import { useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { GrAdd } from "react-icons/gr";

const FilterBar = ({
  handleSearch,
  input,
  setOpen,
}: {
  handleSearch: (input: string) => void;
  input: string;
  setOpen: React.Dispatch<React.SetStateAction<Boolean>>;
}) => {
  const searchBarRef: React.RefObject<HTMLInputElement> | null = useRef(null);
  const clearInput = () => {
    handleSearch("");
    //@ts-ignore
    searchBarRef.current.value = "";
  };
  return (
    <div className="h-[8%] p-3 w-full overflow-hidden bg-black flex items-center justify-between">
      <h1 className="font-bold text-[#f8f8e9]">Messages</h1>
      <button className="font-bold " onClick={() => setOpen((state) => !state)}>
        <h1 className="font-light text-3xl text-[#f8f8e9]">+</h1>
        {/* <GrAdd style={{ color: "#f8f8e9" }} /> */}
      </button>
    </div>
  );
};

export default FilterBar;
