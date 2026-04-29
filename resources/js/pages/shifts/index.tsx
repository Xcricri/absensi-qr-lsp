import { Clock, ArrowRight, ShieldAlert, Fingerprint } from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';

export default function Index({ shifts }: { shifts: any[] }) {
    return (
        <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-slate-50/50 dark:bg-zinc-900/50">
                    <tr>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Nama Shift</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Jam Masuk</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Jam Pulang</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Toleransi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                    {shifts.map((shift: any) => (
                        <tr key={shift.id} className="group hover:bg-slate-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                            {/* Shift Name */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-zinc-800">
                                        <Clock className="size-4 text-slate-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-slate-900 dark:text-zinc-100">{shift.name}</span>
                                        <span className="text-[10px] text-slate-400 font-medium leading-none uppercase tracking-wider">ID: {shift.id}</span>
                                    </div>
                                </div>
                            </td>

                            {/* Work Time (Masuk) */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                    <Fingerprint className="size-4 opacity-50" />
                                    <span className="font-mono text-xs font-bold tracking-tighter bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md">
                                        {shift.work_time}
                                    </span>
                                </div>
                            </td>

                            {/* Home Time (Pulang) */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                                    <ArrowRight className="size-3.5 opacity-60" />
                                    <span className="font-mono text-xs font-bold tracking-tighter bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md">
                                        {shift.home_time}
                                    </span>
                                </div>
                            </td>

                            {/* Tolerance */}
                            <td className="px-6 py-4">
                                <Badge variant="secondary" className="rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-none">
                                    <ShieldAlert className="size-3 mr-1 opacity-70" />
                                    {shift.tolerance} Menit
                                </Badge>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
