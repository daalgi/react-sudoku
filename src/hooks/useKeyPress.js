import { useEffect } from 'react'

export default function useKeyPress(action) {
    useEffect(() => {
        window.addEventListener('keydown', action)
        return () => window.removeEventListener('keydown', action)
    }, [action])
}