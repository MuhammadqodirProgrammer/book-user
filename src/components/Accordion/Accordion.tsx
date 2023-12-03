import { useState } from "react";
type videosType= {
  text: string;
  time: string;
  id: number;
  name: string;
  length: string;


}
type AccordionItem = {
  name: string;
  videos: videosType[];
  content: {
    text: string;
    time: string;
    id: number;
  }[];
};

const Accordion = ({ items }: { items: AccordionItem[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-3">
      {items?.map((item: any, index: number) => (
        <div
          key={index}
          className={`rounded overflow-hidden transition-all duration-500 ${
            index === activeIndex ? "h-auto" : "h-[60px]"
          }`}
        >
          <button
            className="flex items-center justify-between w-[100%] px-4 py-4 bg-newCourcesPreTitleColor font-semibold text-white"
            onClick={() => handleClick(index)}
          >
            <div className="flex items-center">
              <svg
                viewBox="0 0 24 24"
                focusable="false"
                className={`w-5 h-5 leading-4 text-[1.2rem] text-white transition-transform ${
                  index === activeIndex ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                ></path>
              </svg>
              <span>{item.name}</span>
            </div>
            <span>{item.videos.length}ta Dars</span>
          </button>
          <div
            className={`p-4 bg-transparent transition-all duration-500 py-2 px-4 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {item?.videos.map((element: any, contentIndex: any) => (
              <div
                key={contentIndex}
                className={`flex items-center justify-between py-2 ${
                  index === activeIndex ? "h-auto" : "h-0"
                } `}
              >
                <div className="flex gap-2 items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    focusable="false"
                    className="w-7 h-7 text-newCourcesPreTitleColor leading-4"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm144.1 454.9L437.7 677.8a8.02 8.02 0 0 1-12.7-6.5V353.7a8 8 0 0 1 12.7-6.5L656.1 506a7.9 7.9 0 0 1 0 12.9z"></path>
                  </svg>
                  <p className="text-black dark:text-white">
                    #{contentIndex + 1}. {element?.name}
                  </p>
                </div>
                <p className="text-black dark:text-white text-[14px]">
                  {element?.length} minut
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
