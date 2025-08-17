import Image from "next/image"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <Image
        src="/loading.png"
        alt="Loading..."
        width={600}
        height={600}
        className="w-auto h-auto max-w-xs"
        priority
      />
    </div>
  )
}
