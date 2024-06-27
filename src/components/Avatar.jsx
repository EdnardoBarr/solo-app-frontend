import { useContext, useEffect, useState } from 'react';
import avatar from '../assets/images/femaleAvatar.svg';
import { UserContext } from '../contexts/user';
import Avatar, { genConfig } from 'react-nice-avatar';
import { all } from 'axios';

const UserPicture = () => {
  const { userDetails } = useContext(UserContext);
  const [email, setEmail] = useState('random@random.com');

  useEffect(() => {
    if (!userDetails) {
      return;
    }

    const { email } = userDetails;
    setEmail(email);
  }, [userDetails]);
  const config = genConfig(email);
  return <Avatar style={{ width: '4rem', height: '4rem' }} {...config} />;
  // return <img src={avatar} alt='female avatar' className='avatar' />;
};

export default UserPicture;
