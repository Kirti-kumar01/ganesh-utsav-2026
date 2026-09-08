import { useState } from 'react';

const CONTACTS = [
  { name: 'Aastha Negi', phone: '9027437223' },
  { name: 'Abhay Upadhyay', phone: '9981540050' },
  { name: 'Abhishek', phone: '9074304063' },
  { name: 'Amit Sharma', phone: '' },
  { name: 'Anadi Kapoor', phone: '9424891418' },
  { name: 'Aniket Sharma', phone: '8219773546' },
  { name: 'Ashu Pateriya', phone: '7089753290' },
  { name: 'Atharv Rawat', phone: '9131219618' },
  { name: 'Devang Chouhan', phone: '9479522570' },
  { name: 'Dilip Bhaiya', phone: '8878803331' },
  { name: 'Dilip Gurjar', phone: '9174958525' },
  { name: 'Himani', phone: '9111341772' },
  { name: 'Janak', phone: '7250439889' },
  { name: 'Kalika Sir', phone: '9827041964' },
  { name: 'Kartik Mehta', phone: '8868039178' },
  { name: 'Mayur Pare', phone: '8719826726' },
  { name: 'Mohit Yadav', phone: '8839233986' },
  { name: 'Navin Joshi', phone: '6263551395' },
  { name: 'Neha Raghuwanshi', phone: '7879165016' },
  { name: 'Nikita Sahu', phone: '9131702320' },
  { name: 'Sagar Kushwaha', phone: '6260133511' },
  { name: 'Sandeep Sharma', phone: '7047776712' },
  { name: 'Shreya', phone: '9399385346' },
  { name: 'Vikrant Singh', phone: '7440855212' },
];

const avatar = (n) => {
  const p = n.trim().split(/\s+/);
  return (p.length > 1 ? p[0][0] + p[1][0] : n.slice(0, 2)).toUpperCase();
};
const fmt = (p) => (p.length === 10 ? p.slice(0, 5) + ' ' + p.slice(5) : p);
const wa = (p) => { const d = p.replace(/\D/g, ''); return 'https://wa.me/' + (d.length === 10 ? '91' + d : d); };

export default function Contacts() {
  const [q, setQ] = useState('');
  const list = CONTACTS.filter((c) => c.name.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <section className="contacts">
      <div className="prasad-title">
        <div className="prasad-om">☎</div>
        <h2>Contacts</h2>
        <p>Team ke sabhi numbers — ek jagah</p>
      </div>
      <div className="csearch">
        <input type="text" placeholder="Search name…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="contacts-grid">
        {list.length === 0 && <div className="empty-state">No name matches your search.</div>}
        {list.map((c) => (
          <div className="ccard" key={c.name}>
            <span className="av">{avatar(c.name)}</span>
            <div className="cinfo">
              <div className="cname">{c.name}</div>
              {c.phone
                ? <a className="cnum" href={`tel:${c.phone}`}>{fmt(c.phone)}</a>
                : <div className="cnum none">No number</div>}
            </div>
            {c.phone && (
              <div className="cbtns">
                <a className="cbtn call" href={`tel:${c.phone}`} aria-label={`Call ${c.name}`}>📞</a>
                <a className="cbtn wa" href={wa(c.phone)} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${c.name}`}>💬</a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
