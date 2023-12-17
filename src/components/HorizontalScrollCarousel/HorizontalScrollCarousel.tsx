"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import Card from "../Card/Card";
import { BookService } from "@/services/book.services";
import React, { useEffect, useState, useRef } from "react";

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-66%"]);

  const [lastbooks, setLastbooks] = useState([]);
  const fetchbooks = async () => {
    try {
      const data = await BookService.books();
      setLastbooks(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchbooks();
  }, []);

  return (
    <section ref={targetRef} className="relative h-[300vh] ">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-10">
          {lastbooks?.map((card: any) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollCarousel;
