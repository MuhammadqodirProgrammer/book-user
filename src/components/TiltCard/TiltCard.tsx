import { baseURLImg } from "@/app/api/api";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const TiltCard = ({ img, name, birthday, id }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  );

  const handleMouseMove = (e: any) => {
    const rect = e.target.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-96 w-72 max-[640px]:w-[95%] max-[640px]:mx-auto rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
    >
      <Link
        href="/authors"
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg"
        onClick={() => {
          localStorage.setItem("author_id", id);
        }}
      >
        <Image
          className="author_image"
          src={`${baseURLImg}/${img}`}
          alt="image"
          width={1000}
          height={1000}
        />
        <h2 className="text-center pt-2 text-lg font-bold">{name}</h2>
      </Link>
    </motion.div>
  );
};

export default TiltCard;
