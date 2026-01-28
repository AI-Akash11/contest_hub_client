import { FaPlusCircle, FaClipboardList } from "react-icons/fa";

import MenuItem from "./MenuItem";
const CreatorMenu = () => {
  return (
    <>
      <MenuItem icon={FaPlusCircle} label="Add Contest" address="add-contest" />
      <MenuItem
        icon={FaClipboardList}
        label="My Contests"
        address="my-contests"
      />
    </>
  );
};

export default CreatorMenu;
