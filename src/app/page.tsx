'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();

  return (
    <>
      {router.push('login')}
    </>
  );
}

export default Home;