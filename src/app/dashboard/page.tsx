import { CreatePost } from '@/components/createPost'
import { PostCard } from '@/components/postCard'
import React from 'react'

export const Dashboard = () => {
  return (
    <div className='flex flex-row mt-auto overflow-y-hidden fixed top-[5%] justify-center h-[100vh] w-full'>
      <div className='w-[30%] h-full text-center'>
        // Side menu left
      </div>
      <div className='w-[40%] h-auto pb-[3%] overflow-x-hidden overflow-y-auto'>
        <PostCard />
      </div>
      <div className='w-[30%] h-full flex flex-col items-center text-center'>
        // Side menu right
        <CreatePost />
      </div>
    </div>
  )
}