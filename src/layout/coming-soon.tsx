import ImageComingSoon from 'assets/images/coming-soon.jpg';
import { Helmet } from 'react-helmet';

const ComingSoon: React.FC = () => {
  return (
    <div className="bg-white w-full flex justify-center rounded shadow">
      <Helmet>
        <title>CMS | Coming soon</title>
      </Helmet>
      <img src={ImageComingSoon} alt="coming-soon" />
    </div>
  );
};

export default ComingSoon;
