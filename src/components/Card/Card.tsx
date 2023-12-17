import { baseURLImg } from "@/app/api/api";
const Card = ({ card }: any) => {
  return (
    <div
      className="card"
      key={card.id}
      style={{
        backgroundImage: `url(${baseURLImg}${card.book_image})`,
      }}
    >
      <div className="card-content">
        <h2 className="card-title">{card.book_title}</h2>
        <p className="card-body pb-6 pt-4">
          {card.book_description.split("").splice(0, 50)}...
        </p>
        <a
          href="/singlebook"
          className="button"
          onClick={() => {
            localStorage.setItem("book_id", card.id);
          }}
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default Card;
