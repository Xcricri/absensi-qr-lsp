<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Shift;
use App\Models\User;
use App\Models\AttendanceScan;

class ScannerController extends Controller
{
    public function scans()
    {
        $result = Shift::all()->contains("is_active", true);

        return Inertia::render('Scanner/Scan', compact('result'));
    }

    public function myQr()
    {
        return Inertia::render('Scanner/MyQr', [
            'user_code' => auth()->user()->code,
            'user_name' => auth()->user()->name
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'qr_code' => 'required|exists:users,code',
        ]);

        $user = User::where('code', $request->qr_code)->firstOrFail();
        $shift = Shift::all()->first(fn($s) => $s->is_active);

        if (!$shift) {
            return back()->withErrors(['qr_code' => 'Tidak ada shift aktif saat ini.']);
        }

        $scan = AttendanceScan::where('user_id', $user->id)
            ->whereDate('created_at', now()->today())
            ->first();

        if (!$scan) {
            AttendanceScan::create([
                'user_id' => $user->id,
                'time_1' => true,
            ]);
            return back()->with('success', 'Absensi Masuk ' . $user->name . ' Berhasil!');
        }

        if (!$scan->time_1) {
            $scan->update(['time_1' => true]);
            return back()->with('success', 'Absensi Masuk ' . $user->name . ' Berhasil!');
        }

        if (!$scan->time_2) {
            $scan->update(['time_2' => true]);
            return back()->with('success', 'Absensi Pulang ' . $user->name . ' Berhasil! Hati-hati di jalan.');
        }

        return back()->withErrors(['qr_code' => $user->name . ' sudah melakukan absensi masuk & pulang hari ini.']);
    }
}
