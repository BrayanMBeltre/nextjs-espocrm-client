import { NavLink } from "components";
import {
  FaBriefcase,
  FaCommentsDollar,
  FaSignOutAlt,
  FaUserCircle,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";
import { MdContacts, MdDashboard } from "react-icons/md";

export function Sidebar() {
  return (
    <div className="py-4 col-span-2">
      <div className="flex items-center justify-center">
        <h1 className="px-6 text-3xl font-bold text-indigo-600">ESPOCRM</h1>
      </div>

      <div className="my-4 px-6 flex gap-2 items-center">
        <FaUserCircle className="w-8 h-8" />
        <div className="ml-2">
          <div className="font-semibold">Sierra Ferguson</div>
          <div className="text-sm text-gray-400">Admin</div>
        </div>
      </div>

      <ul className="px-6 space-y-4">
        <li>
          <NavLink href="/" exact>
            <MdDashboard className="h-5 w-5 mr-4" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink href="/accounts">
            <FaUsers className="h-5 w-5 mr-4" />
            Account
          </NavLink>
        </li>
        <li>
          <NavLink href="/contacts">
            <MdContacts className="h-5 w-5 mr-4" />
            Contacts
          </NavLink>
        </li>
        <li>
          <NavLink href="/leads">
            <FaUserGraduate className="h-5 w-5 mr-4" />
            Leads
          </NavLink>
        </li>
        <li>
          <NavLink href="/opportunities">
            <FaCommentsDollar className="h-5 w-5 mr-4" />
            Opportunities
          </NavLink>
        </li>
        <li>
          <NavLink href="/cases">
            <FaBriefcase className="h-5 w-5 mr-4" />
            Cases
          </NavLink>
        </li>
      </ul>

      <div className="flex mt-4 space-x-4 items-center border-t-2">
        <div className="px-4 mt-4">
          <NavLink href="/logout">
            <FaSignOutAlt className="h-5 w-5 mr-4" />
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
}
