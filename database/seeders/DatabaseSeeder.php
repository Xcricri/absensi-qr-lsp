<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\ShiftSeeder;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

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
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Panca',
            'role' => 'admin',
            'email' => 'pancapramuditya@gmail.com',
            'password' => Hash::make('abdulganteng12'),
            'code' => Str::random(20)
        ]);
        User::factory()->create([
            'name' => 'member',
            'role' => 'user',
            'email' => 'member@gmail.com',
            'password' => Hash::make('abdulganteng12'),
            'code' => Str::random(20)
        ]);
    }
}
