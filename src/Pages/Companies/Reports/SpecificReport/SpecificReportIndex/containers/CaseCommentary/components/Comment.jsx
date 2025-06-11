import { useMemo } from 'react'
import { useAuthContext } from '../../../../../../../../Context/AuthContext'

export const Comment = ({ comment }) => {
  const { isUserIdMatching } = useAuthContext()

  const isOwnComment = isUserIdMatching(comment?.user?.id)

  const formattedDate = useMemo(
    () => new Date(comment.createdAt).toLocaleString('en-GB'),
    [comment.createdAt]
  )

  const backgroundColor = isOwnComment ? 'bg-darkGreen' : 'bg-gray-200'

  return (
    <div className={`flex flex-col gap-2 p-2 rounded-md shadow-sm ${backgroundColor}`}>
      <div className="text-sm text-gray-500">{formattedDate}</div>
      <div className="text-base" dangerouslySetInnerHTML={{ __html: comment.comment }} />
      {comment.user && (
        <div className="text-sm text-gray-500 text-right">by {comment.user.email}</div>
      )}
    </div>
  )
}
