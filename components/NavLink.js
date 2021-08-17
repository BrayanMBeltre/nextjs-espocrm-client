import { Link } from "components";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

NavLink.defaultProps = {
  exact: false,
};

export function NavLink({ children, href, exact, ...props }) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  props.className =
    "flex items-center font-semibold transition-all duration-200";

  if (isActive) {
    props.className += " text-indigo-600";
  } else {
    props.className += " text-gray-500 hover:text-indigo-600";
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
