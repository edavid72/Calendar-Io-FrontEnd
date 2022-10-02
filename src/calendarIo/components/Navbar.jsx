import { BsFillCalendar3WeekFill } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';
import { useAuthStore } from '../../hooks/useAuthStore';
const Navbar = () => {
  const { startLogout, user } = useAuthStore();

  return (
    <div className="bg-space p-2">
      <div className="container flex justify-between mx-auto">
        <span className="flex text-vintage font-bold text-lg items-center">
          <BsFillCalendar3WeekFill className="mx-1 md:text-xl" />
          <h4 className="mx-1 text-xl md:text-2xl">{user.name}</h4>
        </span>

        <button
          className="flex text-secondary hover:text-primary items-center mr-2 font-semibold md:text-xl"
          onClick={startLogout}
        >
          <ImExit className="mx-1" />
          <span>Exit</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
