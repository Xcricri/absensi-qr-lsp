import { useForm } from '@inertiajs/react';
import { Eye, EyeOff, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { update as userUpdateRoute } from '@/routes/users';
import type { User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function EditUserDialog({ user }: { user: User }) {
    const [isOpen, setIsOpen] = useState(false);
    const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
    const [passwordPreview, setPasswordPreview] = useState(false);

    const { data, setData, put, processing, reset, errors, transform } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: null as File | null,
        password: '',
    });

    const handleAvatarChange = (file: File | null) => {
        if (previewAvatar) {
            URL.revokeObjectURL(previewAvatar);
        }

        setData('avatar', file);

        if (file) {
            setPreviewAvatar(URL.createObjectURL(file));
        } else {
            setPreviewAvatar(null);
        }
    };

    useEffect(() => {
        if (isOpen) {
            setData({
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: null,
                password: '',
            });
        }
    }, [isOpen, user]);

    useEffect(() => {
        return () => {
            if (previewAvatar) {
                URL.revokeObjectURL(previewAvatar);
            }
        };
    }, [previewAvatar]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // Hanya kirim password jika diisi
        transform((current) => {
            const { password, ...rest } = current;

            return password ? current : rest;
        });

        put(userUpdateRoute(user.id).url, {
            onSuccess: () => {
                setIsOpen(false);
                reset('password');
                toast.success('Data karyawan berhasil diupdate');
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                    <Pencil className="size-4 text-blue-500" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Data Karyawan</DialogTitle>
                    <DialogDescription>
                        Perbarui informasi profil atau akses karyawan di sini.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-5 py-2">
                    {/* Section Avatar */}
                    <div className="flex items-center gap-4 border-b pb-4 border-slate-100">
                        <Avatar className="h-16 w-16 border-2 border-muted shadow-sm">
                            <AvatarImage src={previewAvatar ?? user.avatar} className="object-cover" />
                            <AvatarFallback className="bg-blue-50 text-blue-600">
                                {data.name ? data.name.substring(0, 2).toUpperCase() : 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1.5">
                            <Label htmlFor={`avatar-${user.id}`} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Foto Profil
                            </Label>
                            <Input
                                id={`avatar-${user.id}`}
                                type="file"
                                accept="image/*"
                                className="text-xs h-9"
                                onChange={e => handleAvatarChange(e.target.files?.[0] ?? null)}
                            />
                        </div>
                    </div>
                    {errors.avatar && <p className="text-xs font-medium text-destructive">{errors.avatar}</p>}

                    <div className="grid gap-4">
                        {/* Name */}
                        <div className="space-y-1.5">
                            <Label htmlFor={`name-${user.id}`}>Nama Lengkap</Label>
                            <Input
                                id={`name-${user.id}`}
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="Masukkan nama..."
                                className={errors.name ? "border-destructive" : ""}
                            />
                            {errors.name && <p className="text-xs font-medium text-destructive">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <Label htmlFor={`email-${user.id}`}>Email</Label>
                            <Input
                                id={`email-${user.id}`}
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                placeholder="email@perusahaan.com"
                                className={errors.email ? "border-destructive" : ""}
                            />
                            {errors.email && <p className="text-xs font-medium text-destructive">{errors.email}</p>}
                        </div>

                        {/* Role */}
                        <div className="space-y-1.5">
                            <Label htmlFor={`role-${user.id}`}>Role</Label>
                            <Select value={data.role} onValueChange={(value) => setData('role', value as 'user' | 'admin')}>
                                <SelectTrigger id={`role-${user.id}`}>
                                    <SelectValue placeholder="Pilih role..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <Label htmlFor={`password-${user.id}`}>Ganti Password (Opsional)</Label>
                            <div className="relative">
                                <Input
                                    id={`password-${user.id}`}
                                    type={passwordPreview ? "text" : "password"}
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    placeholder="Kosongkan jika tidak diganti"
                                    className={`pr-10 ${errors.password ? "border-destructive" : ""}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordPreview(!passwordPreview)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {passwordPreview ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-xs font-medium text-destructive">{errors.password}</p>}
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0 pt-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setIsOpen(false)}
                            disabled={processing}
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing} className="min-w-[140px]">
                            {processing ? "Menyimpan..." : "Simpan Perubahan"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
