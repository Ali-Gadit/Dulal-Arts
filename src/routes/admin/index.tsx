import { createFileRoute } from '@tanstack/react-router'
import { Studio } from 'sanity'
import { useEffect, useState } from 'react'
import config from '@/sanity/sanity.config'

export const Route = createFileRoute('/admin/')({
  component: AdminPage,
})

function AdminPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Studio config={config} />
    </div>
  )
}
