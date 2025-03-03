'use client'

import Feed from '@/components/feed'
import { LeftSideMenu } from '@/components/leftSideMenu'
import { RightSideMenu } from '@/components/rightSideMenu'
import { Header } from '@/components/header'
import React, { useState } from 'react'
import { UserPage } from '@/components/userPage'
import { useRouter } from 'next/navigation'

export default function Dashboard({ handleAuth }: any) {
  const [isProfileActive, setProfileActive] = useState(true);
  const router = useRouter();

  const handleProfile = () => {
    switch (isProfileActive) {
      case false:
        setProfileActive(true);
        break;

      case true:
        setProfileActive(false);
        break;
    }
  };

  const handleFeed = () => {
    setProfileActive(false);

  }
  return (
    <>
      <Header handleProfile={handleProfile} setProfileActive={handleFeed} handleAuth={handleAuth} />
      <div className='flex flex-row mt-auto overflow-y-hidden fixed top-[10%] h-[100vh] w-full'>
        <div className='w-[30%] h-auto'>
          <LeftSideMenu setProfileActive={handleFeed} />
        </div>
        {isProfileActive === false ? (
          <>
            <div className='w-[40%] h-auto pb-[5%] overflow-x-hidden overflow-y-auto>'>
              <Feed />
            </div>

          </>
        ) : (
          <UserPage
            currentProfilePicture='/eula.jpg'
            currentUserName='dandelion' />
        )}
        <div className='w-[30%] h-full flex flex-col items-center text-center'>
          <RightSideMenu />
        </div>
      </div>
    </>
  )
}