import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useState } from "react"


// import Map from '../components/map'
import Header from '../components/header'
import Content from '../components/content'
import Footer from '../components/footer'
import SeoText from '../components/seo-text'
import Details from '../components/details'
// import data from '../surfSpots10.json'



export default function Home({data}) {

  const spots = data.map((spot) => {
    return {
      ...spot,
      coordinates: spot.coordinates.split(",").map((el) => +el),
    };
  });

  const [selectedSpot, selectSpot] = useState(spots[0])

  const Map = dynamic(
    () => import('../components/map'), 
    { ssr: false } 
  )
  
  return (
    <div>
      <Head>
        <title>Surf Spots</title>
        <meta />  
      </Head>
      <Header />
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 w-full relative">
         
          <Map spots={spots} selectSpot={selectSpot}>
            <Details
              spot={selectedSpot}
              removeSpot={() => {
                selectSpot({})
              }}
            />
          </Map>
          <SeoText />
          <Content />
         
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/spots')
  const data = await response.json()

  return {
    props: {data}
  }
}
