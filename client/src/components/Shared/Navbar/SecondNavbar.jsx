import { Link } from 'react-router-dom';

const SecondNavbar = ({toggleOpen}) => {
    return (
        <div onClick={toggleOpen} className="flex flex-row items-center gap-8 text-lg mt-3">
        <Link><div className="border-b-[3px] border-white hover:border-slate-500 active:border-black pb-2">Stays</div></Link>
        <Link><div className="border-b-[3px] border-white hover:border-slate-500 active:border-black pb-2">Experiences</div></Link>
        <Link><div className="border-b-[3px] border-white hover:border-slate-500 active:border-black pb-2">Online Experiences</div></Link>
      </div>
    );
};

export default SecondNavbar;