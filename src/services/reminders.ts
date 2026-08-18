import { Capacitor } from '@capacitor/core'
import { LocalNotifications } from '@capacitor/local-notifications'

const DAILY_REMINDER_ID = 20401
const DAILY_CHANNEL_ID = 'daily-puzzle'

export function supportsDailyReminders() {
  return Capacitor.isNativePlatform()
}

function nextReminderDate(time: string, skipToday: boolean) {
  const [hour, minute] = time.split(':').map(Number)
  const now = new Date()
  const next = new Date(now)
  next.setHours(Number.isFinite(hour) ? hour : 19, Number.isFinite(minute) ? minute : 0, 0, 0)
  if (skipToday || next <= now) next.setDate(next.getDate() + 1)
  return next
}

export async function enableDailyReminder(time: string, skipToday: boolean) {
  if (!supportsDailyReminders()) return false
  const permission = await LocalNotifications.requestPermissions()
  if (permission.display !== 'granted') return false

  await LocalNotifications.createChannel({
    id: DAILY_CHANNEL_ID,
    name: 'Daily puzzle',
    description: 'One reminder when a new Clue Canvas daily puzzle is ready.',
    importance: 3,
  })
  await LocalNotifications.cancel({ notifications: [{ id: DAILY_REMINDER_ID }] })
  await LocalNotifications.schedule({
    notifications: [{
      id: DAILY_REMINDER_ID,
      title: 'Today’s Clue Canvas is ready',
      body: 'A fresh little aha moment is waiting for you.',
      channelId: DAILY_CHANNEL_ID,
      schedule: {
        at: nextReminderDate(time, skipToday),
        repeats: true,
        every: 'day',
        allowWhileIdle: true,
      },
      extra: { destination: 'daily' },
    }],
  })
  return true
}

export async function disableDailyReminder() {
  if (!supportsDailyReminders()) return
  await LocalNotifications.cancel({ notifications: [{ id: DAILY_REMINDER_ID }] })
}

export async function refreshDailyReminder(time: string, completedToday: boolean) {
  return enableDailyReminder(time, completedToday)
}

export function listenForDailyReminder(onOpenDaily: () => void) {
  if (!supportsDailyReminders()) return () => undefined
  let active = true
  const listener = LocalNotifications.addListener('localNotificationActionPerformed', ({ notification }) => {
    if (active && notification.extra?.destination === 'daily') onOpenDaily()
  })
  return () => {
    active = false
    void listener.then((handle) => handle.remove())
  }
}
