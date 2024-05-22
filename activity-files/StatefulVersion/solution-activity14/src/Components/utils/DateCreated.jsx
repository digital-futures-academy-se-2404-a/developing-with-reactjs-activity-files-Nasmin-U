import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DateCreated = ({ updateDateCreated, dateCreated }) => {
  const [date, setDate] = useState(dateCreated);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    updateDateCreated(date);
  }, [updateDateCreated, date]);

  return (
    <input
      id="todoDateCreated"
      data-testid="dateCreated"
      size="23"
      value={`${date.toLocaleDateString()} @ ${date.toLocaleTimeString()}`}
      readOnly
    />
  );
};

DateCreated.defaultProps = {
  updateDateCreated: () => null,
  dateCreated: new Date(),
};

DateCreated.propTypes = {
  updateDateCreated: PropTypes.func,
  dateCreated: PropTypes.instanceOf(Date),
};

export default DateCreated;
