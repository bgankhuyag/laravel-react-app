<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Todo;

class HomeController extends Controller
{
    /**
     * Show the profile for a given user.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    public function index() {
      return view('home');
    }

    public function get() {
      $user_id = Auth::id();
      $todos = Todo::where('users_id', $user_id)->get(['id', 'todo', 'complete']);
      // dd($todos);
      return response($todos);
    }

    public function add(Request $request) {
      $user_id = Auth::id();
      $todo = new Todo;
      $todo->users_id = $user_id;
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

    public function complete($id) {
      $todo = Todo::where('id', $id)->first();
      if ($todo->complete) {
        $todo->complete = false;
      } else {
        $todo->complete = true;
      }
      $todo->save();
      $user_id = Auth::id();
      $todos = Todo::where('users_id', $user_id)->get(['id', 'todo', 'complete']);
      // dd($todos);
      return response($todos);
    }
}
