import { Head } from '@inertiajs/react';
import { admin } from '@/routes/dashboard';
import { Users, UserCheck, Clock, ArrowRight } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

export default function Admin({ stats, latest_scans }: { stats: any; latest_scans: any[] }) {
    return (
        <>
            <Head title="Dashboard Admin" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 p-6 bg-white dark:bg-neutral-900 dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-neutral-500">Total Karyawan</span>
                            <Users className="size-5 text-blue-500" />
                        </div>
                        <div className="mt-2 flex flex-col">
                            <span className="text-3xl font-bold">{stats.total_employees}</span>
                            <span className="text-xs text-neutral-400 mt-1">Aktif di sistem</span>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 p-6 bg-white dark:bg-neutral-900 dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-neutral-500">Hadir Hari Ini</span>
                            <UserCheck className="size-5 text-green-500" />
                        </div>
                        <div className="mt-2 flex flex-col">
                            <span className="text-3xl font-bold">{stats.present_today}</span>
                            <span className="text-xs text-neutral-400 mt-1">Karyawan masuk</span>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 p-6 bg-white dark:bg-neutral-900 dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-neutral-500">Aktif Shift</span>
                            <Clock className="size-5 text-orange-500" />
                        </div>
                        <div className="mt-2 flex flex-col">
                            <span className="text-3xl font-bold">{stats.total_shifts}</span>
                            <span className="text-xs text-neutral-400 mt-1">Shift terdaftar</span>
                        </div>
                    </div>
                </div>
                <div className="relative min-h-[400px] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-6 bg-white dark:bg-neutral-900 dark:border-sidebar-border">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-lg">Absensi Terbaru</h3>
                        <button className="text-sm text-blue-500 flex items-center hover:underline">
                            Lihat Semua <ArrowRight className="size-4 ml-1" />
                        </button>
                    </div>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-neutral-500 uppercase border-b border-neutral-100 dark:border-neutral-800">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Karyawan</th>
                                    <th className="px-4 py-3 font-medium">Jam Masuk</th>
                                    <th className="px-4 py-3 font-medium">Jam Pulang</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {latest_scans.length > 0 ? (
                                    latest_scans.map((scan) => (
                                        <tr key={scan.id} className="border-b border-neutral-50 dark:border-neutral-800/50 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                                            <td className="px-4 py-4 font-medium">{scan.user?.name}</td>
                                            <td className="px-4 py-4 text-neutral-500 font-mono">
                                                {scan.time_1 ? new Date(scan.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                                            </td>
                                            <td className="px-4 py-4 text-neutral-500 font-mono">
                                                {scan.time_2 ? new Date(scan.updated_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${scan.time_2 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                                                    {scan.time_2 ? 'PULANG' : 'MASUK'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-10 text-center text-neutral-400 italic">Belum ada absensi hari ini</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

Admin.layout = (page: any) => (
    <AppLayout breadcrumbs={[{ title: 'admin', href: admin.url() }]}>
        {page}
    </AppLayout>
);
