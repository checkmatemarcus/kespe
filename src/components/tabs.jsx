import Link from 'next/link';
import { useState, useEffect } from "react";
import { Table } from "flowbite-react";

function MyComponent() {
    return (
        <div>
            <Link href="/about">
                <a>About</a>
            </Link>
        </div>
    );
}