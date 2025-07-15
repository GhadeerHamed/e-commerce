import { Badge, Flex, Text } from "@radix-ui/themes";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdHome } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import AuthStatus from "./AuthStatus";
import { useAuth } from "../contexts/AuthContext";
import LogoutButton from "./LogoutButton";

const NavBar = () => {
  const { getItemCount } = useCart();
  const { user } = useAuth();

  const links = [
    { label: "Products", href: "/products" },
    { label: "Orders", href: "/orders" },
    ...(user?.role === "supplier"
      ? [{ label: "Dashboard", href: "/admin" }]
      : []),
  ];

  return (
    <Flex p="4" className="border-b" justify="between" role="navigation">
      <Flex gap="2" align="start">
        <Text className="font-medium">
          <Link to="/">
            <MdHome size={24} color="#000" />
          </Link>
        </Text>
        <ul className="flex space-x-8 ml-10">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  isActive
                    ? "text-zinc-800"
                    : "text-zinc-700 hover:text-blue-500"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </Flex>
      <Flex gap="2" align="center">
        <Link to="/checkout">
          <Flex align="center" gap="1">
            <AiOutlineShoppingCart />
            <Badge role="status">{getItemCount()}</Badge>
          </Flex>
        </Link>
        <AuthStatus />
        {user && <LogoutButton />}
      </Flex>
    </Flex>
  );
};

export default NavBar;
