'use client'
import Link from 'next/link'
import Button from '../../_components/common/Button'
import { useToast } from '../../_components/common/ToastProvider'
import { redirect } from 'next/navigation'

export default function Page() {
  const { push } = useToast()

  redirect('/landing')
}
