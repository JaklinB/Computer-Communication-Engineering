import { Link } from "react-router-dom";
import Chip from "../../common/Chip";
import "./styles.css";

const BlogItem = ({
  blog: {
    description,
    title,
    createdAt,
    authorName,
    authorAvatar,
    cover,
    category,
    id,
  },
}) => {
  return (
    <Link className="blogItem-link" to={`/blog/${id}`}>
      <div className="blogItem-wrap">
        <img className="blogItem-cover" src={cover} alt="cover" />
        <div className="description">
          <Chip label={category} />
          <h3>{title}</h3>
          <p className="blogItem-desc">{description}</p>
        </div>
        <footer>
          <div className="blogItem-author">
            <img src={authorAvatar} alt="avatar" />
            <div>
              <h6>{authorName}</h6>
              <p>{createdAt}</p>
            </div>
          </div>
        </footer>
      </div>{" "}
    </Link>
  );
};

export default BlogItem;
