import Link from "next/link"
import Image from "next/image"

export function AuthHeader() {
  return (
    <header className="bg-[#181725] text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/logo-text.png" alt="Grovio" width={40} height={40} className="h-8 w-auto" priority />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default AuthHeader
