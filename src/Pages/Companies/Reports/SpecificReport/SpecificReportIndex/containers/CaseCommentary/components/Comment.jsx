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
  const color = isOwnComment ? 'text-white' : 'text-gray-800'

  return (
    <div className={`flex flex-col gap-2 p-2 rounded-md shadow-sm ${backgroundColor}`}>
      <div className={`text-xs ${color}`}>{formattedDate}</div>
      <div className={`text-base ${color}`} dangerouslySetInnerHTML={{ __html: comment.comment }} />
      {comment.user && (
        <div className={`text-sm italic text-right ${color}`}>by {comment.user.email}</div>
      )}
    </div>
  )
}
