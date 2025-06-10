import { useMemo } from 'react'

export const Comment = ({ comment }) => {
  const userId = 123

  const isOwnComment = comment.user && comment.user.id === userId

  const formattedDate = useMemo(
    () => new Date(comment.createdAt).toLocaleString('en-GB'),
    [comment.createdAt]
  )

  const backgroundColor = isOwnComment ? 'bg-darkGreen' : 'bg-gray-200'

  return (
    <div className={`flex flex-col gap-2 p-2 rounded-md shadow-sm ${backgroundColor}`}>
      <div className="text-sm text-gray-500">{formattedDate}</div>
      <div className="text-base" dangerouslySetInnerHTML={{ __html: comment.text }} />
      {comment.user && (
        <div className="text-sm text-gray-500 text-right">by {comment.user.email}</div>
      )}
    </div>
  )
}
