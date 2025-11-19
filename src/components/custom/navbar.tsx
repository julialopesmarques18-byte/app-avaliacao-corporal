'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, LogOut, Menu, X, Activity } from 'lucide-react';
import { getCurrentUser } from '@/lib/storage';
import { logout } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import type { User as UserType } from '@/lib/types';

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    window.location.href = '/auth';
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-90 transition-opacity">
            <Activity className="w-7 h-7" />
            <span className="hidden sm:inline">EVOFIT IA</span>
            <span className="sm:hidden">EVOFIT</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {mounted && currentUser ? (
              <>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{currentUser.name}</span>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    {currentUser.plan.toUpperCase()}
                  </span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </>
            ) : mounted ? (
              <Link href="/auth">
                <Button variant="secondary" size="sm">
                  Entrar
                </Button>
              </Link>
            ) : (
              <div className="w-32 h-9"></div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mounted && mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            {currentUser ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-lg">
                  <User className="w-5 h-5" />
                  <div className="flex-1">
                    <p className="font-medium">{currentUser.name}</p>
                    <p className="text-xs text-white/70">{currentUser.email}</p>
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    {currentUser.plan.toUpperCase()}
                  </span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="w-full text-white hover:bg-white/10 justify-start"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            ) : (
              <Link href="/auth" className="block">
                <Button variant="secondary" className="w-full">
                  Entrar
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
