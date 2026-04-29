import { Head, Link, usePage } from '@inertiajs/react';
import { CalendarCheck2, MapPin, QrCode } from 'lucide-react';
import { dashboard, login } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Presensi Online" />
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6  lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-4xl text-sm">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-full border border-slate-200 px-5 py-1.5 text-sm font-medium transition-colors hover:bg-slate-50 dark:border-zinc-800 dark:text-zinc-300"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={login()}
                                className="inline-block rounded-full bg-slate-900 px-5 py-1.5 text-sm font-medium text-white transition-transform active:scale-95 dark:bg-zinc-100 dark:text-zinc-950"
                            >
                                Masuk Sistem
                            </Link>
                        )}
                    </nav>
                </header>

                <div className="flex w-full items-center justify-center">
                    <main className="flex w-full max-w-4xl flex-col items-center justify-center space-y-12 py-12">

                        {/* Welcome Section */}
                        <div className="flex flex-col items-center text-center space-y-6">
                            <div className="space-y-4">
                                <h1 className="text-5xl font-extrabold tracking-tighter sm:text-7xl text-red-500">
                                    Portal <span className="font-light italic text-white">Absensi.</span>
                                </h1>
                                <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500">
                                    Smart Presence System 2.0
                                </p>
                            </div>

                            <p className="max-w-[600px] text-base text-slate-400 leading-relaxed">
                                Lakukan pencatatan kehadiran secara real-time dengan verifikasi lokasi (GPS)
                                dan identifikasi digital yang aman dan akurat.
                            </p>
                        </div>

                        {/* Ticket / ID Card Container */}
                        <div className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 lg:flex-row dark:border-slate-800 dark:bg-zinc-950 dark:shadow-none">

                            {/* Left Side: Attendance Info */}
                            <div className="flex flex-1 flex-col justify-between p-8 lg:p-12">
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <CalendarCheck2 className="size-5 text-slate-900 dark:text-white" />
                                            <h2 className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white">
                                                Employee Pass <span className="text-slate-300 dark:text-zinc-700">/ ID</span>
                                            </h2>
                                        </div>
                                        <BadgePresensi />
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Status Aktif</p>
                                            <p className="text-lg font-medium">Jam Kerja Reguler</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Verifikasi</p>
                                            <div className="flex items-center gap-1.5 text-slate-600 dark:text-zinc-400">
                                                <MapPin className="size-3.5" />
                                                <p className="text-sm font-medium italic">Geofencing Active</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Perforation Line */}
                            <div className="relative flex items-center justify-center lg:h-auto lg:w-px">
                                <div className="absolute -top-4 -left-4 h-8 w-8 rounded-full border border-slate-200 bg-[#FDFDFC] dark:border-slate-800 dark:bg-[#0a0a0a] lg:left-[-16px]" />
                                <div className="h-px w-full border-t-2 border-dashed border-slate-200 lg:h-full lg:w-px lg:border-l-2 lg:border-t-0 dark:border-slate-800" />
                                <div className="absolute -bottom-4 -left-4 h-8 w-8 rounded-full border border-slate-200 bg-[#FDFDFC] dark:border-slate-800 dark:bg-[#0a0a0a] lg:left-[-16px]" />
                            </div>

                            {/* Right Side: QR Scan Area */}
                            <div className="flex w-full items-center justify-center bg-slate-50 p-12 lg:w-[300px] dark:bg-zinc-900/50">
                                <div className="relative flex flex-col items-center space-y-4 text-center">
                                    <div className="relative h-32 w-32 rounded-2xl border-2 border-slate-200 bg-white p-3 shadow-inner dark:border-zinc-800 dark:bg-zinc-950">
                                        <QrCode className="h-full w-full text-slate-200 dark:text-zinc-800" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="h-1 w-full bg-slate-400/20 animate-pulse rounded-full" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Employee QR</p>
                                        <p className="font-mono text-[10px] font-bold text-slate-300">SECURE-TOKEN-2026</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Credit */}
                        <div className="pt-4 text-center space-y-2">
                            <p className="text-[10px] font-bold uppercase tracking-[0.5em]dark:text-zinc-800">
                                HRIS Management © 2026
                            </p>
                            <p className="text-[9px] text-slate-400 font-medium">Batin Studio Digital System</p>
                        </div>
                    </main>
                </div >
            </div >
        </>
    );
}

// Komponen Badge Kecil untuk Estetika
function BadgePresensi() {
    return (
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 border border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Sistem Online</span>
        </div>
    );
}
