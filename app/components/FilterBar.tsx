import { useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { GrAdd } from "react-icons/gr";
import { User } from "@prisma/client";

type Variant = "AllConversation" | "NewConversation" | "UserSettings";

const FilterBar = ({
  handleSearch,
  input,
  setOpen,
  currentUser,
}: {
  handleSearch: (input: string) => void;
  input: string;
  setOpen: React.Dispatch<React.SetStateAction<Variant>>;
  currentUser: User;
}) => {
  const searchBarRef: React.RefObject<HTMLInputElement> | null = useRef(null);
  const clearInput = () => {
    handleSearch("");
    //@ts-ignore
    searchBarRef.current.value = "";
  };
  return (
    <div className="h-[12%] p-2 w-full overflow-hidden flex items-center justify-between">
      <div className=" h-full w-16">
        <img
          src={`${currentUser?.image}`}
          className="h-full w-full object-cover rounded-full"
          onClick={() =>
            setOpen((prev) => {
              return prev === "UserSettings"
                ? "AllConversation"
                : "UserSettings";
            })
          }
        />
      </div>
      <h1 className="font-bold text-[#f8f8e9]">Messages</h1>
      <button
        className="font-bold "
        onClick={() =>
          setOpen((prev) => {
            return prev === "NewConversation"
              ? "AllConversation"
              : "NewConversation";
          })
        }
      >
        <h1 className="font-light text-3xl text-[#f8f8e9]">+</h1>
        {/* <GrAdd style={{ color: "#f8f8e9" }} /> */}
      </button>
    </div>
  );
};

export default FilterBar;
