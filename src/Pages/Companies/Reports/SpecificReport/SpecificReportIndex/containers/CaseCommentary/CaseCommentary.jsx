import React from 'react'
import { ReportDetailsCard } from '../../../components/ReportDetailsCard/ReportDetailsCard'
import { Comment } from './components/Comment'

export const CaseCommentary = () => {
  const comments = [
    {
      _id: '1',
      text: 'This is the first comment.',
      createdAt: '2023-10-01T12:00:00Z',
      user: {
        email: 'hello@hello.com',
        id: 123
      }
    },
    {
      _id: '12',
      text: 'This is the first comment.',
      createdAt: '2023-10-01T12:00:00Z',
      user: {
        email: 'hello@hello.com',
        id: 1254
      }
    }
  ]

  return (
    <ReportDetailsCard title="Case Commentary">
      <div class="flex gap-4 flex-col">
        {(comments &&
          comments.map((comment) => <Comment key={comment._id} comment={comment} />)) || (
          <div className="text-gray-500">No comments available.</div>
        )}
      </div>
    </ReportDetailsCard>
  )
}
