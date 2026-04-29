<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    protected $fillable = [
        "name",
        "work_time",
        "home_time"
    ];

    protected $casts = ['tolerance' => 'integer'];

    protected $appends = ['is_active'];

    public function getIsActiveAttribute(): bool
    {
        $now = Carbon::now();
        $today = $now->format('Y-m-d');

        $start = Carbon::parse("{$today} {$this->work_time}")
            ->subMinutes($this->tolerance);
        $isOvernight = $this->work_time < $this->home_time;
        $endDate = $isOvernight ? Carbon::tomorrow()->format('Y-m-d') : $today;

        $end = Carbon::parse("{$endDate} {$this->home_time}")->addMinutes($this->tolerance);

        return $now->isBetween($start, $end);
    }
}
