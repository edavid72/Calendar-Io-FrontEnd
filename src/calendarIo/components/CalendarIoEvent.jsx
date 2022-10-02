const CalendarIoEvent = ({ event }) => {
  const { title, user } = event;
  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  );
};

export default CalendarIoEvent;
