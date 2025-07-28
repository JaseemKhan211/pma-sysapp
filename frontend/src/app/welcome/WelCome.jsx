"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function WelCome() {
  const { theme } = useTheme();
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/login');
  };

  return (
    <div className="bg-blue-900 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white  p-7">

      {/* Logo and PMA Title */}
      <div className="flex flex-col items-center mb-6">
        <Image
          src="/pma_logo.png" 
          alt="PMA Logo"
          width={140}
          height={140}
          className="mb-1 rounded-xs shadow-lg"
        />
      </div>
 
      {/* Heading */}
      <h1 className="text-5xl mb-2 font-bold">Privileged Access Management</h1>

      {/* Description */}
      <p className="text-center text-lg max-w-5xl mb-5">
        PAM is a key part of cybersecurity. It helps protect systems by controlling and monitoring access to critical accounts that have high-level permissions. These accounts, like admin or root, can make big changes in a system.
        <br />
        PAM tools help reduce the risk of data breaches, insider threats, and unauthorized access by making sure only the right people can use these powerful accounts. It also keeps a record of all actions, so security teams can track and audit any activity. This helps organizations stay secure, compliant, and in control of sensitive systems.

      </p>

      {/* IP Address Button */}
        <button
          onClick={handleRedirect}
          className="bg-white text-blue-900 dark:bg-gray-100 dark:text-gray-900 font-semibold px-5 py-2 rounded shadow hover:bg-gray-200 dark:hover:bg-white"
        >
          Login to Portal
        </button>
    </div>
  );
}
