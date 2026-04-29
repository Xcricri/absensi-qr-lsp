// import {useMemo, useEffect, useState} from "react"
// import dayjs from "dayjs"
// import isBetween from "dayjs/plugin/isBetween"

import { Scanner } from "@yudiel/react-qr-scanner"
import { useEffect } from "react"
import { router, useForm } from "@inertiajs/react"
import { toast } from "sonner"

export default function ScannerPage({result} : {result : boolean}){
    const { data, setData, post, reset } = useForm({
        qr_code: '',
    });

    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ["is_active"]})
        }, 60 * 1000)
        return () => clearInterval(interval)
    }, [])   

    const handleScan = (detectedCode : any) => {
        if (detectedCode.length > 0) {
            const code = detectedCode[0].rawValue;
            toast.info("Membaca kode: " + code);
            setData("qr_code", code);
        }
    }

    useEffect(() => {
        if (data.qr_code){
            post('/scans', {
                onSuccess: (page) => {
                    toast.success((page.props as any).flash.success || "Berhasil")
                    reset()
                },
                onError: (errors) => {
                    toast.error(errors.qr_code || "Terjadi kesalahan")
                    reset()
                }
            })
        }
    }, [data.qr_code])

    return (
        result ? <Scanner onScan={handleScan}/> : null 
    )
}
