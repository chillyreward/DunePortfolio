'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Printer } from 'lucide-react';

export function PrintButton({ label = 'Print' }: { label?: string }) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => window.print()}
      className="print:hidden gap-2 text-[15px]"
    >
      <Printer className="w-4 h-4" aria-hidden="true" />
      <span>{label}</span>
    </Button>
  );
}
