"use client";

import * as React from "react";
import { sidebarLinks } from "@/constants/index";
import { usePathname, useRouter } from "next/navigation";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components = [
  {
    title: "Subscribers",
    href: "/subscribers",
    description: "Browse all your subscribers and customers",
    icon: (
      <>
        <svg
          className="fill-current inline-block overflow-visible w-6 h-6 mr-4 overflow-visible text-red-500"
          name="three-people"
          viewBox="0 0 24 24"
          style={{ fontSize: "inherit" }}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9.267 5.382a3.865 3.865 0 1 1 5.466 5.466 3.865 3.865 0 0 1-5.466-5.466zm1.06 1.06a2.365 2.365 0 1 1 3.345 3.346 2.365 2.365 0 0 1-3.344-3.345zm10.996 2.551a2.773 2.773 0 1 0-3.922 3.922 2.773 2.773 0 0 0 3.922-3.922zm-2.861 1.06a1.273 1.273 0 1 1 1.8 1.801 1.273 1.273 0 0 1-1.8-1.8zM2.677 8.993A2.773 2.773 0 1 1 6.6 12.915a2.773 2.773 0 0 1-3.922-3.922zm2.861 1.06a1.273 1.273 0 1 0-1.8 1.801 1.273 1.273 0 0 0 1.8-1.8z"
            clip-rule="evenodd"
          ></path>
          <path d="M19.699 14.654a.75.75 0 0 0 0 1.5h.801c.967 0 1.75.783 1.75 1.75V19a.75.75 0 0 0 1.5 0v-1.096a3.25 3.25 0 0 0-3.25-3.25h-.801zM3.5 16.154a1.75 1.75 0 0 0-1.75 1.75V19a.75.75 0 0 1-1.5 0v-1.096a3.25 3.25 0 0 1 3.25-3.25h.801a.75.75 0 0 1 0 1.5H3.5zm6.66-3.005a4.25 4.25 0 0 0-4.25 4.25V19a.75.75 0 0 0 1.5 0v-1.601a2.75 2.75 0 0 1 2.75-2.75h3.679a2.75 2.75 0 0 1 2.75 2.75V19a.75.75 0 0 0 1.5 0v-1.601a4.25 4.25 0 0 0-4.25-4.25H10.16z"></path>
        </svg>
      </>
    ),
  },
  {
    title: "Lading Pages & Forms",
    href: "/forms",
    description:
      "Gather subscribers with a hosted landing page or a form embedded on your website",
    icon: (
      <>
        <svg
          class="fill-current inline-block overflow-visible w-6 h-6 mr-4 overflow-visible text-blue-500"
          name="landing-pages-forms"
          viewBox="0 0 24 24"
          style={{ fontSize: "inherit" }}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4 2.25A2.75 2.75 0 0 0 1.25 5v14A2.75 2.75 0 0 0 4 21.75h4.923a.75.75 0 0 0 .827-.746V14.75h3.75a.75.75 0 0 0 0-1.5H9.75v-4.5h11.5V11a.75.75 0 0 0 1.5 0V5A2.75 2.75 0 0 0 20 2.25H4zm4.25 6.5h-5.5V19c0 .69.56 1.25 1.25 1.25h4.25V8.75zm13-1.5H2.75V5c0-.69.56-1.25 1.25-1.25h16c.69 0 1.25.56 1.25 1.25v2.25zm-16.45-1a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm3.27-.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm2.52 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm7.586 7.117a1.749 1.749 0 0 1 2.475 0l1.586 1.585a1.75 1.75 0 0 1 0 2.475l-5.56 5.56a1.749 1.749 0 0 1-1.237.513h-2.586a.75.75 0 0 1-.75-.75v-2.586c0-.464.184-.909.513-1.237l5.56-5.56zm1.415 1.06a.249.249 0 0 0-.353 0l-5.56 5.56a.25.25 0 0 0-.074.177v1.836h1.836a.25.25 0 0 0 .177-.073l5.56-5.56a.249.249 0 0 0 0-.353l-1.586-1.587z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </>
    ),
  },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="bg-[#48639c] text-white shadow-md py-[12px] px-[20px] mb-[18px] flex gap-12  item-center ">
      <a id="convertkit-logo" href="/" class="block w-8 h-8">
        <img
          src="https://cdn.convertkit.com/packs/media/app/navigation/convertkit-logo-santa-8638470302bc3169784cc2dbc9d16ca2.png"
          width="40"
          height="40"
          alt="ConvertKit logo"
          className=""
        />
        <span
          style={{
            border: "0px",
            clip: "rect(0px, 0px, 0px, 0px)",
            height: "1px",
            margin: "-1px",
            overflow: "hidden",
            padding: "0px",
            position: "absolute",
            width: "1px",
            whiteSpace: "nowrap",
            overflowWrap: "normal",
          }}
        >
          ConvertKit
        </span>
      </a>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/">
              <NavigationMenuTrigger className="bg-[#48639c]">
                Template
              </NavigationMenuTrigger>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-[#48639c]">
              Forms
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                    icon={component.icon}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-[#48639c]">
              Email
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className="main-link h-full flex p-2 rounded hover:no-underline hover:text-gray-900 focus:outline-blue focus:no-underline focus:bg-gray-50"
            {...props}
          >
            {icon}

            <div className="leading-6">
              <div className="font-semibold text-[16px] flex items-center text-gray-900">
                {title}
              </div>
              <p className="line-clamp-3 text-[14px] leading-[20px]  text-gray-800 mt-2  text-muted-foreground">
                {children}
              </p>
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
