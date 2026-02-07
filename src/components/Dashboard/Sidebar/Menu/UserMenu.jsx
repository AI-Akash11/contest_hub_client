import { FaUserPlus, FaListCheck, FaTrophy  } from "react-icons/fa6";

import MenuItem from "./MenuItem";
const UserMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaUserPlus}
        label="Become Creator"
        address="become-creator"
      />
      <MenuItem
        icon={FaListCheck}
        label="My Participations"
        address="my-participated"
      />
      <MenuItem icon={FaTrophy} label="My Winnings" address="my-winnings" />
    </>
  );
};

export default UserMenu;
