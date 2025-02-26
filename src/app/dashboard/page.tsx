'use client'

import { Feed } from '@/components/feed'
import { LeftSideMenu } from '@/components/leftSideMenu'
import { RightSideMenu } from '@/components/rightSideMenu'
import { Header} from '@/components/header'
import React, { useState } from 'react'

export const Dashboard = () => {
  return (
    <>
      <Header />
      <div className='flex flex-row mt-auto overflow-y-hidden fixed top-[10%] h-[100vh] w-full'>
        <div className='w-[30%] h-auto'>
          <LeftSideMenu />
        </div>
        <div className='w-[40%] h-auto pb-[3%] overflow-x-hidden overflow-y-auto>'>
        <Feed />
        </div>
        <div className='w-[30%] h-full flex flex-col items-center text-center'>
          <RightSideMenu />
        </div>
      </div>
    </>
  )
}