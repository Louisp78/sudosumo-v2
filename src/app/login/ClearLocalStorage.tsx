'use client'

import { useEffect } from "react"

export default function ClearLocalStorage() {
    useEffect(() => {
        if (localStorage.length > 0)
            localStorage.clear()
    })
    return null;
}
