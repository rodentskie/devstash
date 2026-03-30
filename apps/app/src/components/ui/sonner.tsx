'use client';

import { Toaster as Sonner, type ToasterProps } from 'sonner';

function Toaster({ position = 'top-center', ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      position={position}
      className="toaster group"
      toastOptions={{
        classNames: {
          success: '!bg-green-900 !border-green-600 !text-green-100 [&_[data-icon]]:text-green-400',
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
