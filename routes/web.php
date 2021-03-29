<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

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

Route::get('/', function() {
  // return view('auth/login');
  return redirect()->route('login');
});
Route::middleware(['auth'])->group(function () {
  Route::get('/home', [HomeController::class, 'index'])->name('home');
  Route::get('/get', [HomeController::class, 'get'])->name('get');
  Route::post('/add', [HomeController::class, 'add'])->name('add');
  Route::post('/edit/{id}', [HomeController::class, 'edit'])->name('edit');
  Route::post('/remove/{id}', [HomeController::class, 'remove'])->name('remove');
  Route::post('/complete/{id}', [HomeController::class, 'complete'])->name('complete');
});


Auth::routes();
