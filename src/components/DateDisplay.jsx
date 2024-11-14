import React, { useEffect, useState } from 'react';

function DateDisplay() {
  const [date, setDate] = useState('');

  useEffect(() => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dayNames = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];

    const updateDate = () => {
      const today = new Date();
      setDate(`${dayNames[today.getDay()]}, ${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`);
    };

    updateDate();
  }, []);

  return (
    <div
    className="clock-date font-serif  p-4 rounded-lg "
    style={{ fontSize: '40px', color: '#6B7280' }} // Set font size directly
  >
    {date}
  </div>
  
  );
}

export default DateDisplay;
