import { FaListCheck, FaTrophy, FaUserPlus } from "react-icons/fa6";

import MenuItem from "./MenuItem";
const UserMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaListCheck}
        label="My Participations"
        address="my-participated"
      />
      <MenuItem icon={FaTrophy} label="My Winnings" address="my-winnings" />
      <MenuItem
        icon={FaUserPlus}
        label="Become Creator"
        address="become-creator"
      />
    </>
  );
};

export default UserMenu;
