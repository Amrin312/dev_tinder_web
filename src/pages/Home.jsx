import React from 'react'
import Hero from '../components/Home/Hero'
import Features from '../components/Home/Features'
import Workflow from '../components/Home/Workflow'
import FinalCTA from '../components/Home/FinalCTA'

const Home = () => {
  return (
    <div>
        <Hero />
        <Features />
        <Workflow />
        <FinalCTA />
    </div>
  )
}

export default Home