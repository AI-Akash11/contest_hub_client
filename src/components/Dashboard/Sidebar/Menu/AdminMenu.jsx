import { FaUserCog, FaClipboardList  } from 'react-icons/fa'
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={FaClipboardList } label='Manage Contests' address='manage-contests' />
    </>
  )
}

export default AdminMenu
