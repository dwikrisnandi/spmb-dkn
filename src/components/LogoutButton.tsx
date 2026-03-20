"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <div className="p-4 border-t">
      <button 
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="w-full p-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
