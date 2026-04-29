<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = [
        'date',
        'month',
        'year',
        'is_attendance',
        'is_late',
    ];
}
