<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;

foreach(User::all() as $u) {
    if(!$u->code) {
        $u->code = 'USR' . str_pad($u->id, 4, '0', STR_PAD_LEFT);
        $u->save();
        echo "Updated User: {$u->name} with Code: {$u->code}\n";
    }
}
echo "Done!\n";
