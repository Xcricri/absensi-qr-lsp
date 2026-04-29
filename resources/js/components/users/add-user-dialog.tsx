import { useForm } from '@inertiajs/react';
import { UserPlus, Eye, EyeOff, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { store as userStoreRoute } from '@/routes/users';
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from '../ui/select';

export function AddUserDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [passwordPreview, setPasswordPreview] = useState(false);
    const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'user',
        avatar: null as File | null,
    });

    const openCreateModal = () => {
        reset();
        setPreviewAvatar(null);
        setIsOpen(true);
    };

    useEffect(() => {
        return () => {
            if (previewAvatar) {
                URL.revokeObjectURL(previewAvatar);
            }
        };
    }, [previewAvatar]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(userStoreRoute().url, {
            onSuccess: () => {
                setIsOpen(false);
                reset();
                setPreviewAvatar(null);
                toast.success('Karyawan berhasil ditambahkan');
            },
        });
    };

    const handleAvatarChange = (file: File | null) => {
        if (previewAvatar) {
            URL.revokeObjectURL(previewAvatar);
        }

        if (file) {
            setPreviewAvatar(URL.createObjectURL(file));
        } else {
            setPreviewAvatar(null);
        }

        setData('avatar', file);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);

                if (!open) {
                    setPreviewAvatar(null);
                }
            }}
        >
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto gap-2" onClick={openCreateModal}>
                    <UserPlus className="size-4" /> Tambah Karyawan
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tambah Karyawan Baru</DialogTitle>
                    <DialogDescription>
                        Lengkapi data di bawah untuk menambahkan anggota tim baru.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-5 py-2">
                    {/* Avatar Upload Section */}
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-muted">
                            <AvatarImage src={previewAvatar ?? undefined} className="object-cover" />
                            <AvatarFallback className="bg-primary/10 text-primary">
                                {data.name ? data.name.substring(0, 2).toUpperCase() : <Upload className="size-5" />}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1.5">
                            <Label htmlFor="avatar" className="text-sm font-medium">Foto Profil</Label>
                            <Input
                                id="avatar"
                                type="file"
                                accept="image/*"
                                className="text-xs"
                                onChange={e => handleAvatarChange(e.target.files?.[0] ?? null)}
                            />
                        </div>
                    </div>
                    {errors.avatar && <p className="text-[0.8rem] font-medium text-destructive">{errors.avatar}</p>}

                    <div className="grid gap-4">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="Masukkan nama..."
                                className={errors.name ? "border-destructive" : ""}
                            />
                            {errors.name && <p className="text-[0.8rem] font-medium text-destructive">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                placeholder="nama@perusahaan.com"
                                className={errors.email ? "border-destructive" : ""}
                            />
                            {errors.email && <p className="text-[0.8rem] font-medium text-destructive">{errors.email}</p>}
                        </div>

                        {/* Role */}
                        <div className="space-y-2">
                            <Label htmlFor="role">Role Akses</Label>
                            <Select value={data.role} onValueChange={(value) => setData('role', value as 'user' | 'admin')}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih role..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password Default</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={passwordPreview ? "text" : "password"}
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    placeholder="Set minimal 8 karakter"
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
                            {errors.password && <p className="text-[0.8rem] font-medium text-destructive">{errors.password}</p>}
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            disabled={processing}
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing} className="min-w-[120px]">
                            {processing ? "Menyimpan..." : "Tambah Karyawan"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
