<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AttendanceScan;
use App\Models\Shift;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
        public function dashboard() {
            if(Auth::user()->role === "admin"){
                return redirect()->route('dashboard.admin');
            } else {
                return redirect()->route('dashboard.user');
            }
        }

    public function user() {
        $user = auth()->user();
        
        $today_scan = AttendanceScan::where('user_id', $user->id)
            ->latest()
            ->first();

        $attendance_count = AttendanceScan::where('user_id', $user->id)->count();

        $history = AttendanceScan::where('user_id', $user->id)
            ->with('user')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('dashboard/user', compact('today_scan', 'attendance_count', 'history'));
    }

    public function admin() {
        $stats = [
            'total_employees' => User::where('role', 'user')->count(),
            'present_today' => AttendanceScan::whereDate('created_at', now()->today())->count(),
            'total_shifts' => Shift::count(),
        ];

        $latest_scans = AttendanceScan::with('user')
            ->orderBy('updated_at', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('dashboard/admin', compact('stats', 'latest_scans'));
    }

}
