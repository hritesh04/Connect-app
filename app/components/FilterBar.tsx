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
    <div className="realtive h-[8%] px-2 py-3 w-full">
      <input
        ref={searchBarRef}
        className="h-[90%] w-[90%] border-2 border-black"
        type="text"
        placeholder="search..."
        onChange={(event) => handleSearch(event.target.value)}
      />
      {input && (
        <button className="relative right-6 top-1" onClick={clearInput}>
          <RxCross2 />
        </button>
      )}
      {input === "" ? (
        <button
          className="relative ml-3 top-[3px] right-1"
          onClick={() => setOpen((state) => !state)}
        >
          <GrAdd />
        </button>
      ) : (
        <button
          className="relative top-[3px] right-1"
          onClick={() => setOpen((state) => !state)}
        >
          <GrAdd />
        </button>
      )}
    </div>
  );
};

export default FilterBar;
