<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\ShiftSeeder;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ShiftSeeder::class,
        ]);


        User::factory(15)->create([
            'role' => 'user',
            'password' => Hash::make('password'),
        ]);

        User::factory()->create([
            'name' => 'Admin',
            'role' => 'admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);
        User::factory()->create([
            'name' => 'Member',
            'role' => 'user',
            'email' => 'member@example.com',
            'password' => Hash::make('password'),
        ]);
    }
}
