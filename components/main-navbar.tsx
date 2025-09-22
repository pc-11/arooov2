import { useLocation } from "react-router";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router";

export interface NavigationItem {
  name: string;
  href: string;
}

export function MainNavbar({
  navigationItems,
}: {
  navigationItems: NavigationItem[];
}) {
  let location = useLocation();
  const socialLinks = [
    { name: "Blog", href: "https://doubleunion.tumblr.com" },
    { name: "Instagram", href: "https://www.instagram.com/doubleunionsf" },
    { name: "Facebook", href: "https://www.facebook.com/doubleunion" },
    { name: "Eventbrite", href: "https://doubleunionsf.eventbrite.com" },
  ];

  return (
    <Disclosure as="nav" className="bg-primary w-full shadow-sm">
      <div className="navbar w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl flex h-16 justify-between">
            <div className="flex">
              {/* Logo with Social Dropdown */}
              <div className="flex shrink-0 items-center">
                <Menu as="div" className="relative">
                  <MenuButton className="flex items-center gap-2 text-white hover:bg-[#a01f57] rounded-lg p-2 focus:outline-none">
                    <img src="/double_union_logo.png" className="h-8 w-8" />
                    <span className="sm:block text-white font-medium">
                      Double Union
                    </span>
                    <ChevronDownIcon className="h-4 w-4 text-white" />
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-primary py-1 shadow-lg ring-1 ring-primary transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    {socialLinks.map((link) => (
                      <MenuItem key={link.name}>
                        <Link
                          to={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="navbar block px-4 py-2 text-sm text-white data-focus:bg-[#a01f57] data-focus:outline-none"
                        >
                          {link.name}
                        </Link>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
              {/* Desktop Navigation */}
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`navbar inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                      item.href == location.pathname
                        ? "border-white text-white"
                        : "border-transparent text-white hover:border-gray-200 hover:text-gray-200"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center gap-4">
              {/* Profile Section */}
              <div className="flex items-center gap-3">
                <Link
                  to="/members/profile"
                  className="navbar flex items-center gap-2 text-white hover:text-gray-200 px-2 py-1 rounded"
                >
                  <img
                    alt="User Avatar"
                    src="/placeholder-avatar.jpg"
                    className="h-8 w-8 rounded-full"
                  />
                </Link>
                <Link
                  to="/logout"
                  className="navbar text-white hover:text-gray-200 p-1 rounded focus:outline-none"
                >
                  <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="-mr-2 flex items-center md:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-[#a01f57] hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-open:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-open:block"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-1 pt-2 pb-3">
            {navigationItems.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className={`navbar block border-l-4 py-2 pr-4 pl-3 text-base font-medium ${
                  item.href == location.pathname
                    ? "border-white bg-[#a01f57] text-white"
                    : "border-transparent text-white hover:border-gray-200 hover:bg-[#a01f57] hover:text-white"
                }`}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
          <div className="border-t border-white/20 pt-4 pb-3">
            <div className="flex items-center px-4">
              <div className="shrink-0">
                <img
                  alt="User Avatar"
                  src="/placeholder-avatar.jpg"
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">Member</div>
                <div className="text-sm font-medium text-white/80">
                  user@doubleunion.org
                </div>
              </div>
              <Link
                to="/logout"
                className="navbar relative ml-auto shrink-0 rounded-full p-1 text-white hover:text-gray-200 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary focus:outline-none"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Sign out</span>
                <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
