import { Head, usePage } from '@inertiajs/react';
import QRCode from "react-qr-code";
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';

// @ts-ignore
const QRCodeComponent = (QRCode.default || QRCode) as any;

export default function AttendanceQR() {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="QR Absensi Saya" />
            <div className="flex h-full flex-1 flex-col items-center justify-center p-4">
                <div className="w-full max-w-md overflow-hidden rounded-2xl border border-sidebar-border/70 bg-white shadow-xl dark:bg-neutral-900 dark:border-sidebar-border">
                    <div className="bg-neutral-50 p-6 text-center dark:bg-neutral-800/50">
                        <h2 className="text-xl font-bold">Kartu Absensi Digital</h2>
                        <p className="text-sm text-neutral-500">Tunjukkan QR ini ke kamera scanner</p>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-8 p-10">
                        <div className="rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-neutral-100 dark:ring-neutral-800">
                            <QRCodeComponent 
                                value={auth.user?.code || "unknown"} 
                                size={220}
                                level="H"
                            />
                        </div>

                        <div className="text-center space-y-2">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Identitas Karyawan</p>
                            <h3 className="text-2xl font-black tracking-tight">{auth.user?.name}</h3>
                            <div className="inline-flex rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-mono font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                {auth.user?.code}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-dashed border-neutral-100 p-6 text-center dark:border-neutral-800">
                        <p className="text-[10px] uppercase tracking-widest text-neutral-400">
                            Sistem Absensi Masa Depan &copy; {new Date().getFullYear()}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

AttendanceQR.layout = (page: any) => (
    <AppLayout breadcrumbs={[{ title: 'Attendance QR', href: '/attendance/qr' }]}>
        {page}
    </AppLayout>
);
