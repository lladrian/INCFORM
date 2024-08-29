import { Link, useLocation } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../utils/authContext";

const Header = () => {
  const { logout } = useAuth();
  const location = useLocation(); // Get current location

  const fullname = localStorage.getItem("fullname");
  const formattedFullname = fullname
    ? fullname.charAt(0).toUpperCase() + fullname.slice(1).toLowerCase()
    : ""; // Capitalizes the first letter and makes the rest lowercase, or sets an empty string if fullname is null

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Request INC form", href: "/inc-request" },
    { name: "My INC Requests", href: "/myinc-requests" },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <Disclosure as="nav" className="fixed top-0 inset-x-0 bg-[#d30707] z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-[#b70707] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#b70707]">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                className="block h-6 w-6 group-data-[open]:hidden"
                aria-hidden="true"
              />
              <XMarkIcon
                className="hidden h-6 w-6 group-data-[open]:block"
                aria-hidden="true"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={
                      location.pathname === item.href ? "page" : undefined
                    }
                    className={classNames(
                      location.pathname === item.href
                        ? "bg-[#b70707] text-white"
                        : "text-white hover:bg-[#b70707] hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <span className="font-semibold text-white">
              Welcome, {formattedFullname}
            </span>
            <button
              type="button"
              className="relative rounded-full bg-[#d30707] p-1 text-white hover:text-[#fffffd] focus:outline-none focus:ring-2 focus:ring-[#b70707] focus:ring-offset-2 focus:ring-offset-[#d30707]"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-[#d30707] text-sm focus:outline-none focus:ring-2 focus:ring-[#b70707] focus:ring-offset-2 focus:ring-offset-[#d30707]">
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt="User profile"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-[#fffffd] py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-slateGray hover:bg-[#d3d3d3]"
                  >
                    Your Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-slateGray hover:bg-[#d3d3d3]"
                  >
                    Settings
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-slateGray hover:bg-[#d3d3d3] w-full text-left"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
      <DisclosurePanel className="fixed inset-0 bg-gray-800 bg-opacity-75 z-40 sm:hidden">
        <div className="flex h-full max-w-xs flex-col bg-white">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-bold text-gray-900">Menu</h2>
            <DisclosureButton className="p-2 text-gray-600 hover:text-gray-900">
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  aria-current={
                    location.pathname === item.href ? "page" : undefined
                  }
                  className={classNames(
                    location.pathname === item.href
                      ? "bg-[#b70707] text-white"
                      : "text-gray-900 hover:bg-gray-100",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Header;
