
import Link from 'next/link';

export default function AdminHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="grid grid-cols-3 gap-4">
        <Link href="/admin/profiles" className="card">Profiles</Link>
        <Link href="/admin/users" className="card">Users</Link>
        <Link href="/admin/stats" className="card">Stats</Link>
      </div>
    </div>
  );
}
