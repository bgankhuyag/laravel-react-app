<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Todo;

class HomeController extends Controller
{
    /**
     * Show the profile for a given user.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    public function index()
    {
      $todos = Todo::all('id', 'todo');
      return view('home', ['todos' => $todos]);
    }

    public function add(Request $request) {
      $todo = new Todo;
      $todo->todo = $request->input('todo');
      $todo->save();
      return $todo->id;
    }

    public function edit(Request $request, $id) {
      $todo = Todo::where('id', $id)->first();
      $todo->todo = $request->input('todo');
      $todo->save();
    }

    public function remove($id) {
      $todo = Todo::where('id', $id)->first();
      $todo->delete();
    }
}
