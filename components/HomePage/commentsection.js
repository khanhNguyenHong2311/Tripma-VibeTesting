import CommentCard from "./comment";
import styles from "./commentsection.module.css";
export default function CommentSection() {
  return (
    <div className={styles.outercontainer}>
      <div className={styles.textconatiner}>
        <h3>
          What <span>Tripma</span> users are saying
        </h3>
      </div>
      <div className={styles.combinedcontainer}>
        <CommentCard></CommentCard>
        <CommentCard></CommentCard>
        <CommentCard></CommentCard>
      </div>
    </div>
  );
}
