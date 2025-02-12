'use client'
 
import { useEffect } from 'react'

export const LoadServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      registerServiceWorker()
    }
  }, [])
 
  return null;
}

const registerServiceWorker = () => {
    navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
      .then(() => {console.log('Client. Registered')})
      .catch(() => {console.error('Client. Registration Failed')})
}
