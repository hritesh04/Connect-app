import { MutableRefObject, useRef } from "react";

const FilterBar = ({
  handleSearch,
}: {
  handleSearch: (input: string) => void;
}) => {
  const searchBarRef: React.RefObject<HTMLInputElement> | null = useRef(null);
  const clearInput = () => {
    handleSearch("");
    //@ts-ignore
    searchBarRef.current.value = "";
  };
  return (
    <div className="realtive h-1/12 w-full">
      <input
        ref={searchBarRef}
        className="w-4/5 h-4/5 pr-6 outline"
        type="text"
        placeholder="search..."
        onChange={(event) => handleSearch(event.target.value)}
      />
      <button className="relative right-5" onClick={clearInput}>
        X
      </button>
    </div>
  );
};

export default FilterBar;
