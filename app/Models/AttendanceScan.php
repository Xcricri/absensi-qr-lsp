<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttendanceScan extends Model
{
    protected $fillable = [
        'user_id',
        'time_1',
        'time_2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
