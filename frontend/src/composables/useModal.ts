import { ref } from 'vue'

export function useModal() {
  const isOpen = ref(false)
  const data = ref<any>(null)

  const open = (modalData?: any) => {
    data.value = modalData
    isOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  const close = () => {
    isOpen.value = false
    data.value = null
    document.body.style.overflow = ''
  }

  const toggle = (modalData?: any) => {
    if (isOpen.value) {
      close()
    } else {
      open(modalData)
    }
  }

  return {
    isOpen,
    data,
    open,
    close,
    toggle
  }
}
