import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Link href={'/marketplace'}>See marketplace</Link>
    </div>
  );
}
