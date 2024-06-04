import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats, MdNotificationAdd } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import { FaPlusSquare, FaUserFriends } from 'react-icons/fa';

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
    text: 'add activity',
    path: '/add-activity',
    icon: <FaPlusSquare />,
  },
  {
    id: 4,
    text: 'connect',
    path: '/connect',
    icon: <FaUserFriends />,
  },
  {
    id: 5,
    text: 'notifications',
    path: '/notifications',
    icon: <MdNotificationAdd />,
  },
  { id: 6, text: 'friendship', path: '/my-friendship', icon: <ImProfile /> },
];

export default links;
