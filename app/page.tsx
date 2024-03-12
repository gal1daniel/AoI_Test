import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section>
        <div className='container p-10'>
          <div className="list-group">
            <Link href="/adatok" className="list-group-item list-group-item-action">Adatok</Link>
            <Link href="/rogzites" className="list-group-item list-group-item-action">Rögzítés</Link>
            <Link href="/modositas" className="list-group-item list-group-item-action">Módosítás</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
