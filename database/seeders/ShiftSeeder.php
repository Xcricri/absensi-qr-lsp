<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShiftSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('shifts')->insert([
            [
                'name' => 'Shift Pagi',
                'work_time' => '07:00:00',
                'home_time' => '12:00:00'
            ],
            [
                'name' => 'Shift Sore',
                'work_time' => '13:00:00',
                'home_time' => '18:00:00'
            ],
            [
                'name' => 'Shift Malam',
                'work_time' => '19:00:00',
                'home_time' => '23:00:00'
            ]
        ]);
    }
}
