import { Component } from '@/components/Visitor'
import React from 'react'

const page = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 md:m-6 my-6 mx-2">
      <Component />
      <Component />
      <Component />

    </div>
  )
}

export default page