import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { LiaGlobeAmericasSolid } from 'react-icons/lia';
import { ImProfile } from 'react-icons/im';
import { FaPlusSquare } from 'react-icons/fa';

const links = [
  { id: 1, text: 'stats', path: '/', icon: <IoBarChartSharp /> },
  {
    id: 2,
    text: 'all activities',
    path: '/all-activities',
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: 'close to you',
    path: '/explore',
    icon: <LiaGlobeAmericasSolid />,
  },
  {
    id: 4,
    text: 'add activity',
    path: '/add-activity',
    icon: <FaPlusSquare />,
  },
  { id: 5, text: 'profile', path: '/profile', icon: <ImProfile /> },
];

export default links;
