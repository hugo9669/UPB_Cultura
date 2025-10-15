import { ref, onMounted, onUnmounted } from 'vue'

export function useCarousel(items: any[], autoPlay = true, interval = 5000) {
  const currentIndex = ref(0)
  const isPlaying = ref(autoPlay)
  let intervalId: NodeJS.Timeout | null = null

  const next = () => {
    currentIndex.value = (currentIndex.value + 1) % items.length
  }

  const previous = () => {
    currentIndex.value = currentIndex.value === 0 ? items.length - 1 : currentIndex.value - 1
  }

  const goTo = (index: number) => {
    if (index >= 0 && index < items.length) {
      currentIndex.value = index
    }
  }

  const play = () => {
    isPlaying.value = true
    if (intervalId) clearInterval(intervalId)
    intervalId = setInterval(next, interval)
  }

  const pause = () => {
    isPlaying.value = false
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  const toggle = () => {
    if (isPlaying.value) {
      pause()
    } else {
      play()
    }
  }

  onMounted(() => {
    if (autoPlay && items.length > 1) {
      play()
    }
  })

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  return {
    currentIndex,
    isPlaying,
    next,
    previous,
    goTo,
    play,
    pause,
    toggle
  }
}
