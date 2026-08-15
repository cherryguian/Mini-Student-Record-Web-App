import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { label } from '@/components/ui/label';
import { dashboard } from '@/routes';
import { useForm } from '@inertiajs/react';

export default function Dashboard() {
    const form = useForm({name: '', email: '', gender: '', course: '', year_level: '', grade: ''});

    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.post('/students',{
            onSuccess: () => form.reset(),
        });

    }
    
        return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div> 
                    <h1 className="text-xl font-semibold">Mini Student Record</h1>
                    <p className="text-muted-foreground text-sm">
                        Add New Student 
                    </p>
                </div>
    
                <form onSubmit={submit} className="max-w-x1 space-y-4 rounded-lg border p-4">
                    <div className="space-y-2">
                    <label htmlFor="name">Name:</label>
                    <Input 
                            id="name"
                            value={form.data.name}
                            placeholder="Enter student name"
                            onChange={(event) => form.setData('name', event.target.value)}
                            />
                            {form.errors.name && <p className="text-sm text-red-600">{form.errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                    <label htmlFor="email">Email:</label>
                    <Input 
                            id="email"
                            type="email"
                            value={form.data.email}
                            placeholder="Enter student email"
                            onChange={(event) => form.setData('email', event.target.value)}
                            />
                            {form.errors.email && <p className="text-sm text-red-600">{form.errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                    <label htmlFor="gender">Gender:</label>

                    <Input 
                            id="gender"
                            value={form.data.gender}
                            placeholder="Enter student gender"
                            onChange={(event) => form.setData('gender', event.target.value)}
                            />
                            {form.errors.gender && <p className="text-sm text-red-600">{form.errors.gender}</p>}
                    </div>

                    <div className="space-y-2">
                    <label htmlFor="course">Course:</label>
                    <Input 
                            id="course"
                            value={form.data.course}
                            placeholder="Enter student course"
                            onChange={(event) => form.setData('course', event.target.value)}
                            />
                            {form.errors.course && <p className="text-sm text-red-600">{form.errors.course}</p>}
                    </div>

                    <div className="space-y-2">
                    <label htmlFor="year_level">Year Level:</label>
                    <Input 
                            id="year_level"
                            value={form.data.year_level}
                            placeholder="Enter student year level"
                            onChange={(event) => form.setData('year_level', event.target.value)}
                            />
                            {form.errors.year_level && <p className="text-sm text-red-600">{form.errors.year_level}</p>}
                    </div>

                    <div className="space-y-2">
                    <label htmlFor="grade">Grade:</label>
                    <Input 
                            id="grade"
                            value={form.data.grade}
                            onChange={(event) => form.setData('grade', event.target.value)}
                            />
                            {form.errors.grade && <p className="text-sm text-red-600">{form.errors.grade}</p>}
                    </div>

                    <Button type="submit" disabled={form.processing}>
                        Save Student
                    </Button>
                </form>
                

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