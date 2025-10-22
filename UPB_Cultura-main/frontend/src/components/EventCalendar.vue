<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface CalendarEvent {
  id: string
  name: string
  date: string
  time: string
  location: string
  category: string
  categoryColor: string
}

interface Props {
  events: CalendarEvent[]
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const currentDate = ref(new Date())
const selectedDate = ref<Date | null>(null)

const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
})

const firstDayOfMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay()
})

const calendarDays = computed(() => {
  const days = []
  const totalDays = daysInMonth.value
  const firstDay = firstDayOfMonth.value
  
  // Días del mes anterior
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: 0, isCurrentMonth: false, events: [] })
  }
  
  // Días del mes actual
  for (let day = 1; day <= totalDays; day++) {
    const dateStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const dayEvents = props.events.filter(event => event.date === dateStr)
    days.push({ day, isCurrentMonth: true, events: dayEvents })
  }
  
  return days
})

const selectedDateEvents = computed(() => {
  if (!selectedDate.value) return []
  const dateStr = `${selectedDate.value.getFullYear()}-${String(selectedDate.value.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.value.getDate()).padStart(2, '0')}`
  return props.events.filter(event => event.date === dateStr)
})

const previousMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
}

const selectDate = (day: number) => {
  if (day > 0) {
    selectedDate.value = new Date(currentYear.value, currentMonth.value, day)
  }
}

const isToday = (day: number) => {
  const today = new Date()
  return day === today.getDate() && 
         currentMonth.value === today.getMonth() && 
         currentYear.value === today.getFullYear()
}

const isSelected = (day: number) => {
  if (!selectedDate.value || day === 0) return false
  return day === selectedDate.value.getDate() && 
         currentMonth.value === selectedDate.value.getMonth() && 
         currentYear.value === selectedDate.value.getFullYear()
}

// Reset selected date when events change
watch(() => props.events, () => {
  selectedDate.value = null
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold text-gray-900">📅 Calendario de Eventos</h3>
      <div class="flex items-center gap-4">
        <button
          @click="previousMonth"
          class="p-2 hover:bg-gray-100 rounded-lg transition"
          :disabled="loading"
        >
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span class="text-lg font-semibold text-gray-800 min-w-[200px] text-center">
          {{ monthNames[currentMonth] }} {{ currentYear }}
        </span>
        <button
          @click="nextMonth"
          class="p-2 hover:bg-gray-100 rounded-lg transition"
          :disabled="loading"
        >
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Calendar grid -->
    <div v-else>
      <!-- Day names -->
      <div class="grid grid-cols-7 gap-2 mb-2">
        <div
          v-for="day in ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']"
          :key="day"
          class="text-center text-sm font-semibold text-gray-600 py-2"
        >
          {{ day }}
        </div>
      </div>

      <!-- Calendar days -->
      <div class="grid grid-cols-7 gap-2">
        <div
          v-for="(dayObj, index) in calendarDays"
          :key="index"
          @click="selectDate(dayObj.day)"
          :class="[
            'relative aspect-square p-2 rounded-lg transition cursor-pointer',
            dayObj.isCurrentMonth ? 'hover:bg-gray-50' : 'bg-gray-50 opacity-50 cursor-default',
            isToday(dayObj.day) ? 'ring-2 ring-blue-500' : '',
            isSelected(dayObj.day) ? 'bg-blue-100' : '',
            dayObj.events.length > 0 && dayObj.isCurrentMonth ? 'font-semibold' : ''
          ]"
        >
          <div class="flex flex-col h-full">
            <span
              :class="[
                'text-sm',
                dayObj.isCurrentMonth ? 'text-gray-900' : 'text-gray-400',
                isToday(dayObj.day) ? 'text-blue-600 font-bold' : ''
              ]"
            >
              {{ dayObj.day || '' }}
            </span>
            <div v-if="dayObj.events.length > 0 && dayObj.isCurrentMonth" class="flex-1 flex items-end">
              <div class="flex gap-1 flex-wrap">
                <div
                  v-for="event in dayObj.events.slice(0, 3)"
                  :key="event.id"
                  class="w-2 h-2 rounded-full"
                  :style="{ backgroundColor: event.categoryColor }"
                  :title="event.name"
                ></div>
                <span v-if="dayObj.events.length > 3" class="text-xs text-gray-500">
                  +{{ dayObj.events.length - 3 }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Selected date events -->
      <div v-if="selectedDate && selectedDateEvents.length > 0" class="mt-6 border-t pt-6">
        <h4 class="font-semibold text-gray-900 mb-4">
          Eventos del {{ selectedDate.getDate() }} de {{ monthNames[selectedDate.getMonth()] }}:
        </h4>
        <div class="space-y-3">
          <div
            v-for="event in selectedDateEvents"
            :key="event.id"
            class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <div
              class="w-3 h-3 rounded-full mt-1 flex-shrink-0"
              :style="{ backgroundColor: event.categoryColor }"
            ></div>
            <div class="flex-1 min-w-0">
              <h5 class="font-semibold text-gray-900 truncate">{{ event.name }}</h5>
              <div class="flex items-center gap-4 mt-1 text-sm text-gray-600">
                <span>🕐 {{ event.time }}</span>
                <span>📍 {{ event.location }}</span>
              </div>
              <span
                class="inline-block mt-2 px-2 py-1 text-xs font-medium rounded"
                :style="{ backgroundColor: event.categoryColor + '20', color: event.categoryColor }"
              >
                {{ event.category }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- No events message -->
      <div v-else-if="selectedDate && selectedDateEvents.length === 0" class="mt-6 border-t pt-6">
        <p class="text-center text-gray-500">
          No hay eventos programados para el {{ selectedDate.getDate() }} de {{ monthNames[selectedDate.getMonth()] }}
        </p>
      </div>

      <!-- Total events summary -->
      <div class="mt-6 text-center text-sm text-gray-600">
        Total de eventos próximos: <span class="font-semibold text-gray-900">{{ events.length }}</span>
      </div>
    </div>
  </div>
</template>


