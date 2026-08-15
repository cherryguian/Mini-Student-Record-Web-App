# Mini-Student-Record-Web-App

This is a Mini Student Record Web App. It allows the user to add, edit, delete, and display the records. So the process of this code is the same as the last time that you taught it to us last week.

## Creating the Student Model, Migration, Factory, Controller, and Resource

Then after I create a database by typing:

```bash
php artisan make:model Student -mfcr
```

## Creating the Students Table

I create a table for the database:

```php
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
```

Then next is:

```php
protected $fillable = [
    'student_id',
    'name',
    'email',
    'gender',
    'course',
    'year_level',
];
```

And the rest are same process as the last time.

---

## Adding More Features

And since we need to add some features like the edit, delete, and display of the students records in the dashboard, we need to add another code because the code we discussed last time can only add a student, while this mini student record code requires the add, display, edit, and delete of student records.

So the add-on of the code is:

This code allows displaying all saved student records in a table. The user can select a student and edit their information or delete the record.

```tsx
export default function Dashboard() {
    const [formData, setFormData] = useState({
        student_id: '',
        name: '',
        email: '',
        gender: '',
        course: '',
        year_level: ''
    });

    const [students, setStudents] = useState<Array<any>>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
```

On this part (the const), it allows the application to store the student data and manage the student records. It also uses an editingId to determine whether the user is adding a new student or editing an existing one.

### Editing a Student Record

When a student is being edited, the application uses Firebase to update the student's record.

```tsx
async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setProcessing(true);

    try {
        if (editingId) {
            const ref = doc(db, 'students', editingId);
            await updateDoc(ref, { ...formData });
            setEditingId(null);
        } else {
            await addDoc(collection(db, 'students'), { ...formData });
        }

        setFormData({
            student_id: '',
            name: '',
            email: '',
            gender: '',
            course: '',
            year_level: ''
        });
    } catch (e) {
        console.error(e);
        alert('An error occurred while saving the student.');
    } finally {
        setProcessing(false);
    }
}
```

### Displaying Student Records

The code allows to display the student records in a table below:

```tsx
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
```

### Edit and Delete Buttons

And provides Edit and Delete buttons for each student:

```tsx
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
                    <Button
                        onClick={() => startEdit(s)}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        Edit
                    </Button>

                    <Button
                        onClick={() => handleDelete(s.id)}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        Delete
                    </Button>
                </div>
            </td>
        </tr>
    ))
) :
```

If the display was empty it will display like this:

```tsx
(
    <tr>
        <td className="p-2" colSpan={8}>
            No students found.
        </td>
    </tr>
)}
```

---

## Firebase Integration

Then after I did all of this, I proceeded to upload my database to Firebase, so I did an AI prompt to create a code that directly uploads my database to Firebase, and then there were some changes to the code, like this one:

```tsx
import {
    collection,
    addDoc,
    onSnapshot,
    updateDoc,
    deleteDoc,
    doc
} from 'firebase/firestore';
```

---

## Note

> **PS:** This is based on my own understanding of the code with the help of AI since I don't have a full understanding of how it really works like how to create an edit, display, delete on the dashboard and the firebase and the rest of the code that are added on the dashboard :)