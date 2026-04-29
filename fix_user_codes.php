<?php
use App\Models\User;

include 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

User::all()->each(function($u) {
    $u->code = 'USR' . str_pad($u->id, 4, '0', STR_PAD_LEFT);
    $u->save();
    echo "Fixed: {$u->name} -> {$u->code}\n";
});
