import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaBriefcase,
  FaCommentsDollar,
  FaSignOutAlt,
  FaUserCircle,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";
import { MdContacts } from "react-icons/md";
import Button from "./Button";

export default function Sidebar() {
  const { pathname } = useRouter();

  return (
    <div className="py-4 col-span-2">
      <div className="flex items-center justify-center">
        <h1 className="px-6 text-3xl font-bold text-indigo-600">ESPOCRM</h1>
      </div>

      <div className="my-4 mx-4 flex gap-2 items-center">
        <FaUserCircle className="w-12 h-12" />
        <div className="ml-4">
          <div className="font-semibold">Sierra Ferguson</div>
          <div className="text-sm text-gray-400">Admin</div>
        </div>
      </div>

      <ul className="px-6 mt-8 space-y-4">
        <li>
          <Button
            href="/"
            Icon={FaUsers}
            text="Dashboard"
            active={pathname === "/"}
          />
        </li>
        <li>
          <Button
            href="/account"
            Icon={FaUsers}
            text="Accounts"
            active={pathname === `/account`}
          />
        </li>
        <li>
          <Button
            href="/contact"
            Icon={MdContacts}
            text="Contacts"
            active={pathname === "/contact"}
          />
        </li>
        <li>
          <Button
            href="/lead"
            Icon={FaUserGraduate}
            text="Leads"
            active={pathname === "/lead"}
          />
        </li>
        <li>
          <Button
            href="/opportunitie"
            Icon={FaCommentsDollar}
            text="Opportunities"
            active={pathname === "/opportunitie"}
          />
        </li>
        <li>
          <Button
            href="/case"
            Icon={FaBriefcase}
            text="Cases"
            active={pathname === "/case"}
          />
        </li>
      </ul>

      <div className="flex mt-4 space-x-4 items-center border-t-2">
        <div className="px-4 mt-4">
          <Button href="/" Icon={FaSignOutAlt} text="Logout" />
        </div>
      </div>
    </div>
  );
}
