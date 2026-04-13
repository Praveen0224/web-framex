'use client';

import React, { Suspense } from 'react';
import Careers from '@/components/sections/Careers';

export default function CareersPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-black uppercase tracking-widest">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                    <span>Syncing_Careers...</span>
                </div>
            </div>
        }>
            <Careers />
        </Suspense>
    );
}
