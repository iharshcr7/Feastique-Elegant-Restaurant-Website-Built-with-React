"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { IonButton } from "@ionic/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "./FoodSlider.css"

const foodItems = [
  { name: "Biryani", image: "src/pages/assets/biryani.png" },
  { name: "Cakes", image: "src/pages/assets/cake.png" },
  { name: "Chinese", image: "src/pages/assets/chinese.png" },
  { name: "Chole Bhature", image: "src/pages/assets/cholebhature.png" },
  { name: "Gulab Jamun", image: "src/pages/assets/gulabjamun.png" },
  { name: "Noodles", image: "src/pages/assets/noodles.jpg" },
  { name: "Paratha", image: "src/pages/assets/paratha.png" },
]

const FoodSlider: React.FC = () => {
  const [index, setIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [visibleItems, setVisibleItems] = useState(4)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Handle responsive visible items
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 768) {
        setVisibleItems(2)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(3)
      } else {
        setVisibleItems(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        moveSlide(1)
      }, 3000)
    }

    startAutoPlay()

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [index])

  // Pause auto-play on hover
  const pauseAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
  }

  const resumeAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = setInterval(() => {
        moveSlide(1)
      }, 3000)
    }
  }

  const moveSlide = (direction: number) => {
    if (isAnimating) return

    setIsAnimating(true)
    setIndex((prevIndex) => {
      const newIndex = (prevIndex + direction + foodItems.length) % foodItems.length
      return newIndex
    })

    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    pauseAutoPlay()
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    resumeAutoPlay()
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      moveSlide(1)
    }

    if (isRightSwipe) {
      moveSlide(-1)
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  // Calculate item width based on visible items
  const itemWidth = containerRef.current ? containerRef.current.offsetWidth / visibleItems : 170

  return (
    <div className="slider-container" onMouseEnter={pauseAutoPlay} onMouseLeave={resumeAutoPlay}>
      <h2 className="slider-title">Popular Food Choices</h2>

      <div className="slider-controls">
        <IonButton className="arrow left" onClick={() => moveSlide(-1)} disabled={isAnimating}>
          <ChevronLeft className="arrow-icon" />
        </IonButton>

        <div className="slider-progress">
          {foodItems.map((_, i) => (
            <div key={i} className={`progress-dot ${i === index ? "active" : ""}`} onClick={() => setIndex(i)} />
          ))}
        </div>

        <IonButton className="arrow right" onClick={() => moveSlide(1)} disabled={isAnimating}>
          <ChevronRight className="arrow-icon" />
        </IonButton>
      </div>

      <div
        className="slider-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={containerRef}
          className="container"
          style={{
            transform: `translateX(${-index * itemWidth}px)`,
            transition: isAnimating ? "transform 0.5s ease-in-out" : "none",
          }}
        >
          {foodItems.map((item, i) => (
            <div className={`item ${index === i ? "active" : ""}`} key={i} style={{ width: `${itemWidth}px` }}>
              <div className="item-inner">
                <div className="img-container">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                </div>
                <p>{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FoodSlider

