<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class OwnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('owners')->insert([
            'name' => 'owner',
            'email' => 'owner@example.com',
            'password' => Hash::make('password123'),
            'created_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
