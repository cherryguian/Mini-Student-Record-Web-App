# Mini-Student-Record-Web-App
This is a Mini Student Record Web App. It allows the user to add, edit, delete, and display the records. So the process of this code is the same as the last time that you taught it to us last week. 

Then after I create a database by typing
php artisan make:model Student -mfcr

I create a table for the database
Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('student_id')->unique();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('gender');
            $table->string('course');
            $table->string('year_level');
            $table->timestamps();
        });

then next is 
protected $fillable = [
        'student_id',
        'name',
        'email',
        'gender',
        'course',
        'year_level',
    ];

and the rest are same process as the last time.


And since we need to add some features like the edit, delete, and display of the students records in the dashboard, we need to add another code because the code we discussed last time can only add a student, while this mini student record code requires the add, display, edit, and delete of student records.

so the add-on of the code is

This code allows displaying all saved student records in a table. The user can select a student and edit their information or delete the record.

const { students } = usePage().props as { students?: Array<any> };
const [editingId, setEditingId] = useState<number | null>(null);
on this part (the const) it allows the application retrieves student data from Laravel and It also uses an editingId to determine whether the user is adding a new student or editing an existing one

When a student is being edited, the application uses a PUT request to update the record
if (editingId) {
    form.put(studentRoutes.update.put(editingId).url, {
        onSuccess: () => {
            form.reset();
            setEditingId(null);
        },
    });
}

The code allows to display the student records in a table below
<div className="mt-6">
                    <h2 className="text-lg font-medium">Student Records</h2>
                    <div className="overflow-x-auto mt-2">
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="text-left">
                                    <th className="p-2">ID</th>
                                    <th className="p-2">Student ID</th>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Email</th>
                                    <th className="p-2">Gender</th>
                                    <th className="p-2">Course</th>
                                    <th className="p-2">Year</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>

and provides Edit and Delete buttons for each student
{students && students.length > 0 ? (
                                    students.map((s: any) => (
                                        <tr key={s.id} className="border-t">
                                            <td className="p-2">{s.id}</td>
                                            <td className="p-2">{s.student_id}</td>
                                            <td className="p-2">{s.name}</td>
                                            <td className="p-2">{s.email}</td>
                                            <td className="p-2">{s.gender}</td>
                                            <td className="p-2">{s.course}</td>
                                            <td className="p-2">{s.year_level}</td>
                                            <td className="p-2">
                                                <div className="flex gap-2">
                                                    <Button onClick={() => startEdit(s)} className="bg-blue-600 hover:bg-blue-700">Edit</Button>
                                                    <Button onClick={() => handleDelete(s.id)} className="bg-red-600 hover:bg-red-700">Delete</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : 
                                if the display was empty it will display like this(
                                    <tr>
                                        <td className="p-2" colSpan={8}>No students found.</td>
                                    </tr>
                                )}

Then after I did all of this, I proceeded to upload my database to Firebase, so I did an AI prompt to create a code that directly uploads my database to Firebase, and then there were some changes to the code, like this one 
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';

ps: This is based on my own understanding of the code with the help of AI since I don't have a full understanding of how it really works like how to create an edit, display, delete on the dashboard and the firebase and the rest of the code that are added on the dashboard:)


 

