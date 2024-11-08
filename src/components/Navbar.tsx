import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Bell, User, LogOut } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
const Navbar = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-[#022424] border-b border-[#03ffc3]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-[#03ffc3] text-xl font-bold">
            GreenCabal
          </Link>

          <SignedIn>
            <div className="flex items-center gap-6">
              <Link
                to="/community"
                className="text-[#03ffc3] hover:text-[#00ff3f] transition-colors"
              >
                Community
              </Link>
              <Link
                to="/dashboard"
                className="text-[#03ffc3] hover:text-[#00ff3f] transition-colors"
              >
                Dashboard
              </Link>
              <div className="flex items-center gap-4">
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="Profile"
                      labelIcon={<User size={20} />}
                      onClick={() => navigate("/profile")}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-4">
              <SignInButton />

              <button
                onClick={() => login({ email: `Clerk@example.com` })}
                className="px-4 py-2 bg-[#00ff3f] text-[#022424] rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <SignInButton>Get Started</SignInButton>
              </button>
            </div>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
