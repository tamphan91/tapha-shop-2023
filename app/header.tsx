import Link from "next/link";

export default function Header() {
  console.log("header");
  return (
    <header className="bg-lime-300">
      <div className="flex items-center justify-between container mx-auto">
        <div className="flex items-center h-14">
          <Link href="/">TP-Shop</Link>
        </div>
        <div className="flex gap-4">
          <div className="cursor-pointer">
            <Link href="/dashboard">Find a Store</Link>
          </div>
          |<div className="cursor-pointer">Help</div>|
          <div className="cursor-pointer">Join Us</div>|
          <div className="cursor-pointer">Sign In</div>
        </div>
      </div>
    </header>
  );
}
