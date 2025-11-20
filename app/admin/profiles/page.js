
import { useEffect, useState } from 'react';

export default function AdminProfiles() {
  const [profiles, setProfiles] = useState([]);
  useEffect(()=>{ fetch('/api/admin/profiles').then(r=>r.json()).then(d=>setProfiles(d || [])); }, []);
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">All Profiles</h1>
      <div className="space-y-3">
        {profiles.map(p => (
          <div key={p._id} className="p-3 bg-white rounded shadow flex justify-between">
            <div>{p.name} • {p.city} • {p.age}</div>
            <div className="flex gap-2">
              <button onClick={async()=>{await fetch('/api/admin/approve',{method:'POST',body:JSON.stringify({id:p._id,approve:true})});}} className="px-2 py-1 bg-green-600 text-white rounded">Approve</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
