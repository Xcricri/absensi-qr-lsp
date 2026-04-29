import { Head, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AddUserDialog } from '@/components/users/add-user-dialog';
import { EditUserDialog } from '@/components/users/edit-user-dialog';
import { destroy as userDestroyRoute } from '@/routes/users';

import type { User } from '@/types';

export default function UsersIndex({ users }: { users: User[] }) {
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus karyawan ini? seluruh data absensinya juga akan hilang.')) {
            router.delete(userDestroyRoute(id).url, {
                onSuccess: () => toast.success('Karyawan berhasil dihapus'),
            });
        }
    };

    return (
        <>
            <Head title="Kelola Karyawan" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Kelola Karyawan</h1>
                        <p className="text-sm text-muted-foreground">Total {users.length} karyawan terdaftar</p>
                    </div>
                    <AddUserDialog />
                </div>

                <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-white dark:bg-neutral-900 dark:border-sidebar-border shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-neutral-500 uppercase bg-neutral-50/50 dark:bg-neutral-800/30 border-b border-neutral-100 dark:border-neutral-800">
                                <tr>
                                    <th className="px-6 py-4 font-black">Karyawan</th>
                                    <th className="px-6 py-4 font-black">Identitas (QR)</th>
                                    <th className="px-6 py-4 font-black">Email</th>
                                    <th className="px-6 py-4 font-black">Role</th>
                                    <th className="px-6 py-4 font-black">Avatar</th>
                                    <th className="px-6 py-4 font-black text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-xs font-black text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded tracking-tighter">
                                                {user.code}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-neutral-500">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-500 font-bold uppercase tracking-wider">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Avatar className='w-10 h-10'>
                                                <AvatarImage src={user.avatar} alt="Avatar" />
                                                <AvatarFallback>
                                                    <span className="text-xs font-bold">{user.name.charAt(0)}</span>
                                                </AvatarFallback>
                                            </Avatar>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <EditUserDialog user={user} />
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
                                                    <Trash2 className="size-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

UsersIndex.layout = {
    breadcrumbs: [
        {
            title: 'Kelola Karyawan',
            href: '/users',
        },
    ],
};

