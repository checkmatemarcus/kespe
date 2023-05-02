// Font settings
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] });

// Imports
import HighScoreTable from '@/components/HighScoreTable';
import React from 'react';

export default function Home() {
  return (
    <main class="flex m-auto">

      <HighScoreTable />
    </main>
  )
}
