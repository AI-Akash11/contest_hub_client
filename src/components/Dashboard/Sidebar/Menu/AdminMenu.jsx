import { FaUserCog, FaClipboardList, FaUserTag  } from 'react-icons/fa'
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserTag} label='Creator Requests' address='creator-requests' />
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={FaClipboardList } label='Manage Contests' address='manage-contests' />
    </>
  )
}

export default AdminMenu
