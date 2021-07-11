import dayjs from 'dayjs'
import { RootState } from './store'

interface Calendar {
  [key: string]: {
    selected: boolean
  }
}
export const selectActivity = (state: RootState) => state.meditation.activity
export const selectTotalSessions = (state: RootState) =>
  Object.keys(state.meditation.activity).length || 0
export const selectTotalDuration = (state: RootState) => {
  let total: number = 0
  Object.values(state.meditation.activity).forEach((a) => {
    if (a.duration) {
      total += a.duration
    }
  })
  return total
}
export const selectCalendar = (state: RootState) => {
  const { activity } = state.meditation
  const calendar: Calendar = {}
  Object.keys(activity).forEach((k) => {
    const date = dayjs(parseInt(k, 10)).format('YYYY-MM-DD')
    calendar[date] = {
      selected: true,
    }
  })
  return calendar
}
export const selectStreak = (state: RootState) => {
  const calendar = selectCalendar(state)
  let streak: number = 0

  let n = 0
  while (true) {
    const date = dayjs().subtract(n, 'day').format('YYYY-MM-DD')
    if (!calendar[date]) {
      break
    }
    n += 1
    streak += 1
  }

  return streak
}
