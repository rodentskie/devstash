'use client';

import { createContext, useContext, useState } from 'react';

type SidebarContextType = {
  open: boolean;
  mobileOpen: boolean;
  toggle: () => void;
  toggleMobile: () => void;
};

const SidebarContext = createContext<SidebarContextType>({} as SidebarContextType);

export function useSidebar() {
  return useContext(SidebarContext);
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        open,
        mobileOpen,
        toggle: () => setOpen((v) => !v),
        toggleMobile: () => setMobileOpen((v) => !v),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
