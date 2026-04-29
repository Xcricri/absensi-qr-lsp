import { Head } from '@inertiajs/react';
import QRCode from "react-qr-code";
import AppLayout from '@/layouts/app-layout';

export default function MyQr({ user_code, user_name }: { user_code: string; user_name: string }) {
    // Pengaman jika import QRCode terbaca sebagai objek modul
    const QRCodeComponent = (QRCode as any).default || QRCode;

    return (
        <AppLayout breadcrumbs={[{ title: 'QR Absensi Saya', href: '/attendance/qr' }]}>
            <Head title="QR Absensi Saya" />
            <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
                <div className="w-full max-w-sm bg-white dark:bg-neutral-900 rounded-3xl shadow-xl overflow-hidden border border-neutral-100 dark:border-neutral-800">
                    {/* Header Kartu */}
                    <div className="bg-blue-600 p-8 text-center text-white">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30 capitalize text-3xl font-black">
                            {user_name.charAt(0)}
                        </div>
                        <h2 className="text-xl font-bold">{user_name}</h2>
                        <p className="text-blue-100 text-xs mt-1 uppercase tracking-widest">{user_code}</p>
                    </div>

                    {/* QR Code Section */}
                    <div className="p-10 flex flex-col items-center bg-white dark:bg-neutral-900">
                        <div className="p-4 bg-white rounded-2xl shadow-inner border border-neutral-50 mb-6">
                            <QRCodeComponent
                                value={user_code || "unknown"}
                                size={200}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                        <p className="text-center text-sm text-neutral-500 max-w-[200px]">
                            Tunjukkan QR Code ini ke petugas atau mesin scanner untuk melakukan absensi.
                        </p>
                    </div>

                    {/* Footer Kartu */}
                    <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 text-center border-t border-neutral-100 dark:border-neutral-800">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">Kartu Identitas Digital • LSP Present</span>
                    </div>
                </div>

                <p className="mt-8 text-xs text-neutral-400 font-medium">
                    Pastikan layar HP cukup terang saat melakukan scan.
                </p>
            </div>
        </AppLayout>
    );
}
