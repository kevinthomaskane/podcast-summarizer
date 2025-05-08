'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { usePathname } from 'next/navigation';

export function Header() {
  const path = usePathname();
  const { user, signOut } = useAuth();

  const isActive = (pathname: string) => {
    return path === pathname ? 'font-bold' : 'font-medium';
  };

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <svg
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
                <span className="ml-2 text-xl font-bold text-indigo-600">
                  Podcast Summarizer
                </span>
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {user ? (
              // Authenticated user navigation
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className={`text-gray-600 hover:text-gray-900 px-3 py-2 text-sm ${isActive('/dashboard')}`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/history"
                  className={`text-gray-600 hover:text-gray-900 px-3 py-2 text-sm ${isActive('/history')}`}
                >
                  History
                </Link>
                <div className="flex items-center space-x-4 border-l pl-4">
                  <span className="text-sm text-gray-600">{user.email}</span>
                  <button
                    onClick={() => signOut()}
                    className="cursor-pointer text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              // Unauthenticated user navigation
              <div className="flex items-center space-x-4">
                <Link
                  href="/features"
                  className={`text-gray-600 hover:text-gray-900 px-3 py-2 text-sm ${isActive('/features')}`}
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  className={`text-gray-600 hover:text-gray-900 px-3 py-2 text-sm ${isActive('/pricing')}`}
                >
                  Pricing
                </Link>
                <Link
                  href="/login"
                  className="text-indigo-600 hover:text-indigo-500 px-3 py-2 text-sm font-medium"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
