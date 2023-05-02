// Font settings
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] });

// Imports
import HighScoreTable from '@/components/HighScoreTable';
import React from 'react';



export default function Home() {
  const [searchResults, setSearchResults] = React.useState([]);

  return (
    <main>
      <HighScoreTable />
    </main>
  )
}
