import { Head, usePage } from '@inertiajs/react';
import { user } from '@/routes/dashboard';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';

export default function User({ today_scan = null, attendance_count = 0, history = [] }: { today_scan?: any, attendance_count?: number, history?: any[] }) {
    console.log("PROPS RECEIVED:", { today_scan, attendance_count, history });
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Welcome Card */}
                    <div className="flex flex-col items-center justify-center space-y-2 rounded-xl border border-sidebar-border/70 p-6 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-500/20">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Selamat Datang!</span>
                        <h3 className="font-bold text-xl">{auth.user?.name}</h3>
                        <p className="text-center text-xs text-neutral-500 italic">"Disiplin adalah kunci kesuksesan."</p>
                    </div>

                    {/* Status Today Card */}
                    <div className="flex flex-col items-center justify-center p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white dark:bg-neutral-900 shadow-sm">
                        <span className="text-sm font-medium text-neutral-500 mb-3">Status Hari Ini</span>
                        <div className="flex gap-6">
                            <div className="text-center">
                                <p className="text-[10px] text-neutral-400 uppercase font-black tracking-tighter">Masuk</p>
                                <p className="text-xl font-mono font-bold text-green-600">
                                    {today_scan?.time_1 ? new Date(today_scan.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                                </p>
                            </div>
                            <div className="w-[1px] bg-neutral-100 dark:bg-neutral-800"></div>
                            <div className="text-center">
                                <p className="text-[10px] text-neutral-400 uppercase font-black tracking-tighter">Pulang</p>
                                <p className="text-xl font-mono font-bold text-orange-600">
                                    {today_scan?.time_2 ? new Date(today_scan.updated_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Attendance Stats Card */}
                    <div className="flex flex-col items-center justify-center p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white dark:bg-neutral-900 shadow-sm">
                        <span className="text-sm font-medium text-neutral-500 mb-1">Kehadiran Bulan Ini</span>
                        <h3 className="text-4xl font-black text-neutral-800 dark:text-neutral-200">{attendance_count}</h3>
                        <p className="text-[10px] text-neutral-400 underline">Hari Terdaftar</p>
                    </div>
                </div>

                {/* History Section */}
                <div className="relative min-h-[400px] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-6 bg-white dark:bg-neutral-900 dark:border-sidebar-border shadow-sm">
                    <h3 className="font-bold text-lg mb-6">Riwayat Absensi Terakhir</h3>
                    <div className="space-y-4">
                         {history.length > 0 ? history.map((h) => (
                             <div key={h.id} className="flex items-center justify-between p-4 rounded-xl bg-neutral-50/50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
                                 <div className="flex flex-col">
                                     <span className="text-sm font-bold">{new Date(h.created_at).toLocaleDateString('id-ID', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</span>
                                     <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest">{h.time_2 ? 'LENGKAP' : 'BELUM PULANG'}</span>
                                 </div>
                                 <div className="text-right">
                                     <div className="flex gap-2 items-center bg-white dark:bg-neutral-900 px-3 py-1 rounded-lg border border-neutral-100 dark:border-neutral-800">
                                         <span className="text-xs font-mono font-bold text-green-600">{h.time_1 ? new Date(h.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '--:--'}</span>
                                         <span className="text-neutral-300">-</span>
                                         <span className="text-xs font-mono font-bold text-orange-600">{h.time_2 ? new Date(h.updated_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '--:--'}</span>
                                     </div>
                                 </div>
                             </div>
                         )) : (
                             <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
                                 <p className="italic">Belum ada riwayat absensi minggu ini.</p>
                             </div>
                         )}
                    </div>
                </div>
            </div>
        </>
    );
}

User.layout = (page: any) => (
    <AppLayout breadcrumbs={[{ title: 'User', href: user.url() }]}>
        {page}
    </AppLayout>
);
