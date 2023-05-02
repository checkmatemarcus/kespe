// Font settings
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] });

// Imports
import HighScoreTable from '@/components/HighScoreTable';
import NextClash from '@/components/NextClash';
import React from 'react';

export default function Home() {
  return (
    <>
      <h1 class="font-extrabold flex justify-center p-6 text-6xl drop-shadow-2xl">Kespe.no</h1>
      <main class="flex flex-wrap gap-16 justify-center pt-20" >
        <HighScoreTable class="max-h-full" />
        <NextClash />
      </main>
    </>
  )
}
