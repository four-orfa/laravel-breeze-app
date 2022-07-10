<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ComponentSampleController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('User/Welcome', [
        'canLogin' => Route::has('user.login'),
        'canRegister' => Route::has('user.register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('User/Dashboard');
})->middleware(['auth:users', 'verified'])->name('dashboard');

Route::get('/component-1', [ComponentSampleController::class, 'showComponent1']);
Route::get('/component-2', [ComponentSampleController::class, 'showComponent2']);


require __DIR__ . '/auth.php';
