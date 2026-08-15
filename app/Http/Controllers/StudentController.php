<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('dashboard', [
            'students' => Student::query()->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'student_id' => ['required', 'integer', 'unique:students,student_id'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:students,email'],
            'gender' => ['required', 'string', 'max:10'],
            'course' => ['required', 'string', 'max:255'],
            'year_level' => ['required', 'string', 'max:50'],
        ]);

        Student::create($data);

        return redirect()->route('dashboard')->with('success', 'Student created successfully.');
    }

    /**
     * Display the specified resource.
     */
    // public function show(Student $student)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(Student $student)
    // {
        
    // }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        $data = $request->validate([
            'student_id' => ['required', 'integer', 'unique:students,student_id,' . $student->id],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:students,email,' . $student->id],
            'gender' => ['required', 'string', 'max:10'],
            'course' => ['required', 'string', 'max:255'],
            'year_level' => ['required', 'string', 'max:50'],
        ]);

        $student->update($data);

        return redirect()->route('dashboard')->with('success', 'Student updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();

        return redirect()->route('dashboard')->with('success', 'Student deleted successfully.');
    }
}
