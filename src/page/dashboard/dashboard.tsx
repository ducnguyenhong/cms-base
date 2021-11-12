import { Helmet } from 'react-helmet';
import { DashboardCompetitor } from './dashboard-competitor';
import { DashboardEvent } from './dashboard-event';
import { DashboardUser } from './dashboard-user';

export const Dashboard: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>CMS | Bảng điều khiển</title>
      </Helmet>
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-3 lg:col-span-1 bg-white rounded">
          <DashboardEvent />
        </div>
        <div className="col-span-3 lg:col-span-2 bg-white rounded">
          <DashboardUser />
        </div>
      </div>
      <div className="mt-10">
        <DashboardCompetitor />
      </div>
    </div>
  );
};
