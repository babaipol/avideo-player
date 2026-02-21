import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FiArrowLeft, FiHome } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-[120px] font-black leading-none bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/">
            <Button variant="primary">
              <FiHome size={16} />
              Go Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline">
              <FiArrowLeft size={16} />
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
