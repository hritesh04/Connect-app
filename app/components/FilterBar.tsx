const FilterBar = ({
  setInput,
}: {
  setInput: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="search..."
        onChange={(event) => setInput(event.target.value)}
      />
    </div>
  );
};

export default FilterBar;
