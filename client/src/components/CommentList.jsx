// client/src/components/CommentList.jsx
export const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p>No comments yet. Be the first to comment!</p>
  }

  return (
    <div className="comment-list">
      {comments.map(comment => (
        <div key={comment._id} className="comment">
          <div className="comment-header">
            <span className="comment-author">{comment.author.username}</span>
            <span className="comment-date">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="comment-content">
            {comment.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}