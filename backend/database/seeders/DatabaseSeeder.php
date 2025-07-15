<?php

namespace Database\Seeders;

use App\Enums\Roles;
use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Ghadeer',
            'email' => 'user@mail.com',
            "password" => "secret",
            "role" => Roles::Customer,
        ]);

        $supplier = User::factory()->create([
            'name' => 'Supplier',
            'email' => 'seller@mail.com',
            "password" => "secret",
            "role" => Roles::Supplier,
        ]);

        Product::factory()->count(100)->create(['owner_id' => $supplier->id]);
    }
}
