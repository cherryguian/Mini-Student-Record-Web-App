import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { dashboard } from '@/routes';
import { db } from '@/firebase';
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export default function Dashboard() {
    const [formData, setFormData] = useState({ student_id: '', name: '', email: '', gender: '', course: '', year_level: '' });
    const [students, setStudents] = useState<Array<any>>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const col = collection(db, 'students');
        const unsub = onSnapshot(col, (snapshot) => {
            const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setStudents(data as Array<any>);
        });
        return () => unsub();
    }, []);

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
            setFormData({ student_id: '', name: '', email: '', gender: '', course: '', year_level: '' });
        } catch (e) {
            console.error(e);
            alert('An error occurred while saving the student.');
        } finally {
            setProcessing(false);
        }
    }

    function startEdit(s: any) {
        setEditingId(s.id);
        setFormData({
            student_id: s.student_id ?? '',
            name: s.name ?? '',
            email: s.email ?? '',
            gender: s.gender ?? '',
            course: s.course ?? '',
            year_level: s.year_level ?? '',
        });
    }

    function cancelEdit() {
        setEditingId(null);
        setFormData({ student_id: '', name: '', email: '', gender: '', course: '', year_level: '' });
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete this student?')) return;
        try {
            await deleteDoc(doc(db, 'students', id));
        } catch (e) {
            console.error(e);
            alert('Failed to delete student.');
        }
    }
    
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-xl font-semibold">Mini Student Record</h1>
                    <p className="text-muted-foreground text-sm">Add New Student</p>
                </div>

                <form onSubmit={submit} className="max-w-x1 space-y-4 rounded-lg border p-4">
                    <div className="space-y-2">
                        <label htmlFor="student_id">Student ID:</label>
                        <Input
                            id="student_id"
                            value={formData.student_id}
                            placeholder="Enter student ID"
                            onChange={(event) => setFormData({ ...formData, student_id: event.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="name">Name:</label>
                        <Input
                            id="name"
                            value={formData.name}
                            placeholder="Enter student name"
                            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email">Email:</label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            placeholder="Enter student email"
                            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="gender">Gender:</label>
                        <Input
                            id="gender"
                            value={formData.gender}
                            placeholder="Enter student gender"
                            onChange={(event) => setFormData({ ...formData, gender: event.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="course">Course:</label>
                        <Input
                            id="course"
                            value={formData.course}
                            placeholder="Enter student course"
                            onChange={(event) => setFormData({ ...formData, course: event.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="year_level">Year Level:</label>
                        <Input
                            id="year_level"
                            value={formData.year_level}
                            placeholder="Enter student year level"
                            onChange={(event) => setFormData({ ...formData, year_level: event.target.value })}
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            {editingId ? 'Update Student' : 'Save Student'}
                        </Button>
                        {editingId && (
                            <Button type="button" onClick={cancelEdit} className="bg-gray-500 hover:bg-gray-600">
                                Cancel
                            </Button>
                        )}
                    </div>
                </form>

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
                            <tbody>
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
                                ) : (
                                    <tr>
                                        <td className="p-2" colSpan={8}>No students found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};