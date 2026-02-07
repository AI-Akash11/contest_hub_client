import { FaUserPlus } from "react-icons/fa6";

import MenuItem from "./MenuItem";
const UserMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaUserPlus}
        label="Become Creator"
        address="become-creator"
      />
    </>
  );
};

export default UserMenu;
