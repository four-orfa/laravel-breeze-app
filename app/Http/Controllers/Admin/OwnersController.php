<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use App\Models\Owner;
use Hash;
use Inertia\Inertia;

class OwnersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $owners = Owner::get();
        $owners = Owner::select('id', 'name', 'email', 'created_at')
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc')
            ->paginate(15);
        // dd($owners);

        return Inertia::render('Admin/OwnersManagement', [
            'owners' => $owners,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return Inertia::render('Admin/OwnerCreate', []);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:owners',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        Owner::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        return redirect()->route('admin.owners.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $owner = Owner::findOrFail($id);

        return Inertia::render('Admin/OwnerEdit', ['owner' => $owner]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $owner = Owner::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
        ]);
        $owner->name = $request->name;
        $owner->email = $request->email;

        if ($request->password) {
            $request->validate(['password' => ['required', 'confirmed', Rules\Password::defaults()]]);
            $owner->password = Hash::make($request->password);
        }

        $owner->save();

        return redirect()->route('admin.owners.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Soft delete.
        Owner::findOrFail($id)->delete();

        return redirect()->route('admin.owners.index');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function expiredOwnerIndex()
    {
        $owners = Owner::onlyTrashed()->get();
        return Inertia::render('Admin/ExpiredOwnersManagement', [
            'owners' => $owners,
        ]);
    }

    /**
     * Force delete from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function expiredOwnerDestroy($id)
    {
        Owner::onlyTrashed()->findOrFail($id)->forceDelete();

        return redirect()->route('admin.expired-owners.index');
    }
}
