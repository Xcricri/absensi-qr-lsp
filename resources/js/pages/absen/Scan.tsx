import { router, useForm } from "@inertiajs/react"
import { Scanner } from "@yudiel/react-qr-scanner"
import { useEffect } from "react"
import { toast } from "sonner"

export default function ScannerPage({ result }: { result: boolean }) {
    const { data, setData, post, reset, processing } = useForm({
        qr_code: '',
    });

    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ["is_active"] })
        }, 60 * 1000)

        return () => clearInterval(interval)
    }, [])

    const handleScan = (detectedCode: any) => {
        if (detectedCode.length > 0 && !processing) {
            const code = detectedCode[0].rawValue;

            if (code !== data.qr_code) {
                setData("qr_code", code);
                toast.info("Membaca kode...");
            }
        }
    }

    useEffect(() => {
        if (data.qr_code) {
            post('/scans', {
                onSuccess: (page) => {
                    toast.success((page.props as any).flash.success || "Berhasil")
                    reset()
                },
                onError: (errors) => {
                    toast.error(errors.qr_code || "Terjadi kesalahan")
                    reset()
                },
                onFinish: () => reset()
            })
        }
    }, [data.qr_code])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 ">
            {/* Header / Info Section */}
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold tracking-tight">QR Scanner</h1>
                <p className="text-slate-400 text-sm mt-2">
                    Arahkan kamera ke kode QR untuk memindai
                </p>
            </div>

            {/* Scanner Container */}
            <div className="relative w-full max-w-md aspect-square overflow-hidden rounded-3xl border-4   shadow-2xl">
                {result ? (
                    <>
                        <Scanner
                            onScan={handleScan}
                            paused={processing} // Hentikan scanner saat loading
                            styles={{
                                container: { width: '100%', height: '100%' }
                            }}
                        />

                        {/* Overlay Mask (Aksesoris visual) */}
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                            <div className="w-64 h-64 border-2 border-dashed border-white/50 rounded-2xl flex items-center justify-center">
                                {processing && (
                                    <div className="bg-black/60 inset-0 absolute flex items-center justify-center backdrop-blur-sm">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full space-y-4 p-8 text-center">
                        <div className="bg-red-500/10 p-4 rounded-full">
                            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <p className="font-medium text-slate-300">Scanner Tidak Aktif</p>
                    </div>
                )}
            </div>

            {/* Footer / Status */}
            <div className="mt-8 flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${result ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium text-slate-300">
                    Sistem: {result ? 'Siap Memindai' : 'Off'}
                </span>
            </div>
        </div>
    )
}
