<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', function() {
  // return view('auth/login');
  return redirect()->route('login');
});

// Route::get('/get', [HomeController::class, 'get'])->name('get');
Route::middleware('auth:api')->group(function () {
  Route::get('/home', [HomeController::class, 'index'])->name('home');
  Route::get('/get', [HomeController::class, 'get'])->name('get');
  Route::post('/add', [HomeController::class, 'add'])->name('add');
  Route::post('/edit/{id}', [HomeController::class, 'edit'])->name('edit');
  Route::post('/remove/{id}', [HomeController::class, 'remove'])->name('remove');
  Route::post('/complete/{id}', [HomeController::class, 'complete'])->name('complete');
});
