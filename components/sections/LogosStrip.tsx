'use client';

import Image from "next/image";

export default function LogosStrip() {
  const logos = [
    { name: "Gulf Estates", src: "/images/gulf.png", scale: "scale-[1.6]" },
    { name: "Company 2", src: "/images/lock.png", scale: "scale-[0.9]" },
    { name: "Mary Homes", src: "/images/mary.png", scale: "scale-[1.4]" },
    { name: "Wee Share", src: "/images/weeshare.png", scale: "scale-[0.9]" },
    { name: "Vector", src: "/images/pcld.png", scale: "scale-[1.2]" },
    { name: "Suits & Sand", src: "/images/dubai.png", scale: "scale-[0.45]" },
    { name: "Daral", src: "/images/fram.png", scale: "scale-[1.7]" },
  ];

  return (
    <section className="w-full py-10 bg-[#0d0d1a] border-t border-[#0d0d1a]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-20 md:gap-y-6">

          {logos.map((logo) => (
            <div
              key={logo.name}
              className="w-[100px] h-[50px] flex items-center justify-center"
            >
              <div className={logo.scale}>
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={100}
                  height={30}
                  className="object-contain max-h-full max-w-full"
                />
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}