import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { User } from '@/types';
import { store as userStoreRoute, update as userUpdateRoute, destroy as userDestroyRoute } from '@/routes/users';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger, 
    DialogFooter 
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Pencil, Trash2, UserPlus, Search, Shield, User as UserIcon } from 'lucide-react';

export default function UsersIndex({ users }: { users: User[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    
    const { data, setData, post, put, delete: destroy, processing, reset, errors } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const openCreateModal = () => {
        setEditingUser(null);
        reset();
        setIsOpen(true);
    };

    const openEditModal = (user: User) => {
        setEditingUser(user);
        setData({
            name: user.name,
            email: user.email,
            password: '',
        });
        setIsOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingUser) {
            put(userUpdateRoute(editingUser.id).url, {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    toast.success('Data karyawan berhasil diupdate');
                },
            });
        } else {
            post(userStoreRoute().url, {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    toast.success('Karyawan berhasil ditambahkan');
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus karyawan ini? seluruh data absensinya juga akan hilang.')) {
            destroy(userDestroyRoute(id).url, {
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
                        <p className="text-sm text-neutral-500 text-muted-foreground">Total {users.length} karyawan terdaftar</p>
                    </div>

                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button className="w-full sm:w-auto" onClick={openCreateModal}>
                                <UserPlus className="size-4 mr-2" /> Tambah Karyawan
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editingUser ? 'Edit Data Karyawan' : 'Tambah Karyawan Baru'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={submit} className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Lengkap</Label>
                                    <Input 
                                        id="name" 
                                        value={data.name} 
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="Masukkan nama..."
                                    />
                                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                        id="email" 
                                        type="email"
                                        value={data.email} 
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="email@perusahaan.com"
                                    />
                                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">{editingUser ? 'Password Baru (Kosongkan jika tidak diubah)' : 'Password Default'}</Label>
                                    <Input 
                                        id="password" 
                                        type="password"
                                        value={data.password} 
                                        onChange={e => setData('password', e.target.value)}
                                        placeholder="********"
                                    />
                                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={processing}>
                                        {editingUser ? 'Simpan Perubahan' : 'Tambah Karyawan'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-white dark:bg-neutral-900 dark:border-sidebar-border shadow-sm">
                    <div className="p-4 border-b border-neutral-100 dark:border-neutral-800">
                        <div className="relative max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                            <Input placeholder="Cari karyawan..." className="pl-9 bg-neutral-50 dark:bg-neutral-800 border-none" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-neutral-500 uppercase bg-neutral-50/50 dark:bg-neutral-800/30 border-b border-neutral-100 dark:border-neutral-800">
                                <tr>
                                    <th className="px-6 py-4 font-black">Karyawan</th>
                                    <th className="px-6 py-4 font-black">Identitas (QR)</th>
                                    <th className="px-6 py-4 font-black">Email</th>
                                    <th className="px-6 py-4 font-black">Role</th>
                                    <th className="px-6 py-4 font-black text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-black uppercase text-xs">
                                                    {user.name.charAt(0)}
                                                </div>
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
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => openEditModal(user)}>
                                                    <Pencil className="size-4 text-blue-500" />
                                                </Button>
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

