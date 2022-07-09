<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use Illuminate\Http\Request;

class ComponentSampleController extends Controller
{
    //
    public function showComponent1()
    {
        $users = 'user';
        return Inertia::render('ShowComponents/Sample1', ['users' => $users]);
    }
    public function showComponent2()
    {
        $users = 'user';
        return Inertia::render('ShowComponents/Sample2', ['users' => $users]);
    }
}
