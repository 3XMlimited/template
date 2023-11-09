"use client";
import Image from "next/image";
import Link from "next/link";

const Topbar = () => {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        {/* <Image src='/logo.svg' alt='logo' width={28} height={28} /> */}
        <p className="text-heading3-bold text-light-1 max-xs:hidden">
          TEMPLATE
        </p>
      </Link>

      <div className="flex items-center gap-1">
        {/* <div className="block "></div> */}
        {/* <CreateOrganization /> */}
      </div>
    </nav>
  );
};

export default Topbar;
