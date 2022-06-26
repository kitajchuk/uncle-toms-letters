import { useState, useEffect } from 'react';

const Notifications = () => {
  const [notified, setNotified] = useState(false);

  const onClickIcon = () => {
    if (window.Notification) {
      window.Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          setNotified(true);
        }
      });
    }
  };

  useEffect(() => {
    if (window.Notification) {
      if (window.Notification.permission === 'granted') {
        setNotified(true);
      }
    }

  }, []);

  return (
    <div className="fixed top-5 left-5 cursor-pointer" onClick={onClickIcon}>
      <img src={notified ? '/svg/bell_subbed.svg' : '/svg/bell.svg'} width="24" alt="" />
    </div>
  );
};

export default Notifications;