import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="/Logo.svg"
        alt="Sundown Studio Logo"
        width={130}
        height={45}
        priority
        className="h-auto w-auto object-contain"
      />
    </div>
  );
}