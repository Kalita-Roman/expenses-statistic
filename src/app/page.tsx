'use client'
 
import { useEffect } from 'react'
 
function PushNotificationManager() {
 
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      registerServiceWorker()
    }
  }, [])
 
  function registerServiceWorker() {
    navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
      .then(() => {console.log('Client. Registered')})
      .catch(() => {console.error('Client. Registration Failed')})
  }

  return (
    <div>
      <h1>App</h1>
    </div>
  )
}

export default function Page() {
  return (
    <div>
      <PushNotificationManager />
    </div>
  )
}
