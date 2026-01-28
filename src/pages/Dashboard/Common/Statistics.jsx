import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import CreatorStatistics from '../../../components/Dashboard/Statistics/CreatorStatistics'
import UserStatistics from '../../../components/Dashboard/Statistics/UserStatistics'
const Statistics = () => {
  return (
    <div>
      <AdminStatistics />
      <UserStatistics />
      <CreatorStatistics />
    </div>
  )
}

export default Statistics
