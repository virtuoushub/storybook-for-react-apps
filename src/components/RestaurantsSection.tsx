// @ts-nocheck
import React, { useState, useEffect } from 'react'
import Carousel from '@brainhubeu/react-carousel'

import { PageSection } from './PageSection'
import { RestaurantCard } from './RestaurantCard'
import { getCuratedRestaurants } from '../stub/restaurants'
import { viewports } from '../styles/breakpoints'
export const RestaurantsSection = () => {
  const [slideIndex, setSlideIndex] = useState(0)
  const [restaurants, setRestaurants] = useState<any>([
    { isLoading: true },
    { isLoading: true },
    { isLoading: true },
  ])

  useEffect(() => {
    const getData = async () => {
      const data = await getCuratedRestaurants()
      setRestaurants(data)
    }

    getData()
  }, [])
  return (
    <PageSection
      title="New arrivals"
      showNextButton
      showPreviousButton
      onNextClick={() => setSlideIndex(slideIndex + 1)}
      onPreviousClick={() => setSlideIndex(slideIndex - 1)}
    >
      <Carousel
        infinite
        value={slideIndex}
        onChange={setSlideIndex}
        slidesPerPage={4}
        offset={24}
        breakpoints={{
          [viewports.S]: {
            slidesPerPage: 1,
          },
          [viewports.M]: {
            slidesPerPage: 2,
          },
          [viewports.L]: {
            slidesPerPage: 3,
          },
        }}
      >
        {restaurants.map((restaurant, index) => (
          <RestaurantCard
            key={restaurant.name + index}
            restaurant={restaurant}
          />
        ))}
      </Carousel>
    </PageSection>
  )
}
