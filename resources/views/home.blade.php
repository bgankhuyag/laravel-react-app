<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="{{asset('css/home.css')}}" type="text/css">
        <title>ToDo</title>
    </head>
    <body>
      {{-- @foreach ($notes as $note)
      @endforeach --}}
      <div class="container">
        <h1 class="header">Welcome to ToDo</h1>
        <div id="todos">
        </div>
      </div>

      <script>
        var todosObject = @json($todos)
      </script>
      <script src="{{ asset('/js/app.js') }}"></script>
    </body>
</html>
