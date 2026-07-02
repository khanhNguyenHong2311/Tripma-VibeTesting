import Image from "next/image";
import styles from "./comment.module.css";
import { FaStar } from "react-icons/fa";
export default function CommentCard({ user }) {
  let firstName, lastName, image, place, date, rating, comment;
  firstName = "Yifei";
  lastName = "Chen";
  image = "./commenter.svg";
  place = "Seoul, South Korea | April 2019";
  rating = 4;
  comment =
    "What a great experience using Tripma! I booked all of my flights for my gap year through Tripma and never had any issues. When I had to cancel a flight because of an emergency, Tripma support helped me";
  return (
    <div className={styles.commentContainer}>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={`${firstName} ${lastName}`}
          width={48}
          height={48}
        />
      </div>
      <div className={styles.textSection}>
        <div className={styles.userData}>
          <span className={styles.name}>{`${firstName} ${lastName}`}</span>
          <span className={styles.place}>{place}</span>
          <div className={styles.userRating}>
            {[...Array(5)].map((star, index) => (
              <FaStar
                key={index}
                className={
                  index < rating ? styles.starFilled : styles.starEmpty
                }
              />
            ))}
          </div>
        </div>
        <div className={styles.preview}>
          <p className={styles.comment}>{comment}</p>
          <span>readmore...</span>
        </div>
      </div>
    </div>
  );
}
