import { useState, useRef } from "react";

const initialForm = {
  cliente: "",
  azienda: "",
  email: "",
  telefono: "",
  titolo: "",
  tipo: "Offset",
  formato: "A4",
  quantita: "",
  carta: "Patinata lucida 130gr",
  colori: "4+4 (CMYK)",
  plastificatura: "Nessuna",
  finitura: "",
  consegna: "",
  note: "",
};

const tipiStampa = ["Offset", "Digitale", "Serigrafia", "Flexografia", "Tampografia", "Large Format"];
const formati = ["A3", "A4", "A5", "A6", "100x70", "50x70", "Personalizzato"];
const carte = [
  "Patinata lucida 130gr",
  "Patinata lucida 170gr",
  "Patinata lucida 250gr",
  "Patinata opaca 130gr",
  "Patinata opaca 170gr",
  "Offset 80gr",
  "Offset 100gr",
  "Offset 120gr",
  "Riciclata 100gr",
  "Cartoncino 300gr",
  "Cartoncino 350gr",
];
const coloriOptions = ["1+0 (Nero)", "1+1 (Nero/Nero)", "4+0 (CMYK)", "4+4 (CMYK)", "Pantone + 4C", "Personalizzato"];
const plastificature = ["Nessuna", "Lucida fronte", "Lucida fronte/retro", "Opaca fronte", "Opaca fronte/retro", "Soft-touch fronte", "Soft-touch fronte/retro"];

const STATUS_COLORS = {
  "In attesa": "#f59e0b",
  "In lavorazione": "#3b82f6",
  "Completata": "#10b981",
  "Annullata": "#ef4444",
};

function generateId() {
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `CM-${year}-${num}`;
}

export default function App() {
  const [view, setView] = useState("list"); // list | new | detail
  const [commesse, setCommesse] = useState([
    {
      id: "CM-2026-0042",
      cliente: "Marco Bianchi",
      azienda: "Studio Grafico Bianchi",
      email: "m.bianchi@studioB.it",
      telefono: "02 1234567",
      titolo: "Catalogo Primavera 2026",
      tipo: "Offset",
      formato: "A4",
      quantita: "5000",
      carta: "Patinata lucida 170gr",
      colori: "4+4 (CMYK)",
      plastificatura: "Opaca fronte/retro",
      finitura: "Rilegatutra brossura",
      consegna: "2026-04-10",
      note: "Urgente – campione colore approvato",
      stato: "In lavorazione",
      dataCreazione: "2026-03-10",
    },
  ]);
  const [form, setForm] = useState(initialForm);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStato, setFilterStato] = useState("Tutte");
  const printRef = useRef();

  const filteredCommesse = commesse.filter((c) => {
    const matchSearch =
      c.cliente.toLowerCase().includes(search.toLowerCase()) ||
      c.azienda.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.titolo.toLowerCase().includes(search.toLowerCase());
    const matchStato = filterStato === "Tutte" || c.stato === filterStato;
    return matchSearch && matchStato;
  });

  function handleSubmit() {
    if (!form.cliente || !form.titolo || !form.quantita) {
      alert("Compilare almeno: Cliente, Titolo lavoro e Quantità.");
      return;
    }
    const nuova = {
      ...form,
      id: generateId(),
      stato: "In attesa",
      dataCreazione: new Date().toISOString().split("T")[0],
    };
    setCommesse([nuova, ...commesse]);
    setForm(initialForm);
    setView("list");
  }

  function handleStatusChange(id, stato) {
    setCommesse(commesse.map((c) => (c.id === id ? { ...c, stato } : c)));
    if (selected?.id === id) setSelected({ ...selected, stato });
  }

  function handleDelete(id) {
    if (confirm("Eliminare questa commessa?")) {
      setCommesse(commesse.filter((c) => c.id !== id));
      setView("list");
      setSelected(null);
    }
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0f0f0f", minHeight: "100vh", color: "#f0ece4" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #1a1a1a; } ::-webkit-scrollbar-thumb { background: #444; border-radius: 3px; }
        input, select, textarea { outline: none; }
        .badge { display:inline-block; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:600; letter-spacing:.5px; }
        @media print {
          .no-print { display:none !important; }
          body { background: white !important; color: black !important; }
          .print-card { background: white !important; color: black !important; border: 1px solid #ccc !important; }
        }
      `}</style>

      {/* HEADER */}
      <header className="no-print" style={{ background: "#161616", borderBottom: "1px solid #2a2a2a", padding: "0 32px", display: "flex", alignItems: "center", gap: 24, height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#e63946,#c1121f)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🖨️</div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px" }}>PrintFlow</div>
            <div style={{ fontSize: 11, color: "#666", marginTop: -2 }}>Gestione Commesse</div>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 4, marginLeft: 16 }}>
          {["list", "new"].map((v) => (
            <button key={v} onClick={() => { setView(v); setSelected(null); }} style={{ padding: "6px 18px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, background: view === v ? "#e63946" : "transparent", color: view === v ? "#fff" : "#888", transition: "all .2s" }}>
              {v === "list" ? "📋 Commesse" : "+ Nuova Commessa"}
            </button>
          ))}
        </nav>
        <div style={{ marginLeft: "auto", fontSize: 12, color: "#555" }}>
          {commesse.length} commesse totali · {commesse.filter((c) => c.stato === "In lavorazione").length} in corso
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>

        {/* LIST VIEW */}
        {view === "list" && !selected && (
          <div>
            <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }} className="no-print">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍  Cerca per cliente, azienda, ID, titolo…" style={{ flex: 1, minWidth: 220, background: "#1c1c1c", border: "1px solid #2e2e2e", borderRadius: 8, padding: "10px 16px", color: "#f0ece4", fontSize: 13 }} />
              {["Tutte", "In attesa", "In lavorazione", "Completata", "Annullata"].map((s) => (
                <button key={s} onClick={() => setFilterStato(s)} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid", borderColor: filterStato === s ? "#e63946" : "#2e2e2e", background: filterStato === s ? "#e6394622" : "transparent", color: filterStato === s ? "#e63946" : "#666", fontSize: 12, cursor: "pointer", fontWeight: 500 }}>{s}</button>
              ))}
            </div>

            {filteredCommesse.length === 0 ? (
              <div style={{ textAlign: "center", padding: 80, color: "#444" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
                <div style={{ fontSize: 16 }}>Nessuna commessa trovata</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {filteredCommesse.map((c) => (
                  <div key={c.id} onClick={() => { setSelected(c); setView("detail"); }} style={{ background: "#161616", border: "1px solid #252525", borderRadius: 10, padding: "16px 20px", cursor: "pointer", display: "grid", gridTemplateColumns: "120px 1fr 1fr auto", gap: 16, alignItems: "center", transition: "border-color .2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "#e63946"} onMouseLeave={(e) => e.currentTarget.style.borderColor = "#252525"}>
                    <div>
                      <div style={{ fontSize: 11, color: "#555", marginBottom: 2 }}>ID Commessa</div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, color: "#e63946" }}>{c.id}</div>
                      <div style={{ fontSize: 11, color: "#444", marginTop: 4 }}>{c.dataCreazione}</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{c.titolo}</div>
                      <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{c.cliente} · {c.azienda}</div>
                    </div>
                    <div style={{ fontSize: 12, color: "#666" }}>
                      <div>🖨️ {c.tipo} · {c.formato}</div>
                      <div style={{ marginTop: 4 }}>📦 {c.quantita} copie · {c.carta}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span className="badge" style={{ background: STATUS_COLORS[c.stato] + "22", color: STATUS_COLORS[c.stato] }}>
                        {c.stato}
                      </span>
                      {c.consegna && <div style={{ fontSize: 11, color: "#555", marginTop: 6 }}>📅 {c.consegna}</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* NEW COMMESSA */}
        {view === "new" && (
          <div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 24, marginBottom: 24 }}>
              <span style={{ color: "#e63946" }}>+</span> Nuova Commessa
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <Section title="👤 Dati Cliente">
                <Field label="Nome Cliente *" value={form.cliente} onChange={(v) => setForm({ ...form, cliente: v })} />
                <Field label="Azienda" value={form.azienda} onChange={(v) => setForm({ ...form, azienda: v })} />
                <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                <Field label="Telefono" value={form.telefono} onChange={(v) => setForm({ ...form, telefono: v })} />
              </Section>
              <Section title="🖨️ Specifiche di Stampa">
                <Field label="Titolo Lavoro *" value={form.titolo} onChange={(v) => setForm({ ...form, titolo: v })} />
                <FieldSelect label="Tipo di Stampa" value={form.tipo} options={tipiStampa} onChange={(v) => setForm({ ...form, tipo: v })} />
                <FieldSelect label="Formato" value={form.formato} options={formati} onChange={(v) => setForm({ ...form, formato: v })} />
                <Field label="Quantità *" type="number" value={form.quantita} onChange={(v) => setForm({ ...form, quantita: v })} />
              </Section>
              <Section title="📄 Carta e Colori">
                <FieldSelect label="Tipo Carta" value={form.carta} options={carte} onChange={(v) => setForm({ ...form, carta: v })} />
                <FieldSelect label="Colori" value={form.colori} options={coloriOptions} onChange={(v) => setForm({ ...form, colori: v })} />
                <FieldSelect label="Plastificatura" value={form.plastificatura} options={plastificature} onChange={(v) => setForm({ ...form, plastificatura: v })} />
                <Field label="Finitura speciale" value={form.finitura} onChange={(v) => setForm({ ...form, finitura: v })} placeholder="Es: fustellatura, rilievo, vernice UV…" />
              </Section>
              <Section title="📅 Consegna e Note">
                <Field label="Data Consegna" type="date" value={form.consegna} onChange={(v) => setForm({ ...form, consegna: v })} />
                <div>
                  <label style={{ fontSize: 11, color: "#666", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".5px" }}>Note</label>
                  <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={5} style={{ width: "100%", background: "#1c1c1c", border: "1px solid #2e2e2e", borderRadius: 8, padding: "10px 14px", color: "#f0ece4", fontSize: 13, resize: "vertical", fontFamily: "inherit" }} />
                </div>
              </Section>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              <button onClick={handleSubmit} style={{ background: "#e63946", color: "#fff", border: "none", borderRadius: 8, padding: "12px 32px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                ✓ Crea Commessa
              </button>
              <button onClick={() => { setForm(initialForm); setView("list"); }} style={{ background: "#1c1c1c", color: "#888", border: "1px solid #2e2e2e", borderRadius: 8, padding: "12px 24px", fontSize: 14, cursor: "pointer" }}>
                Annulla
              </button>
            </div>
          </div>
        )}

        {/* DETAIL VIEW */}
        {view === "detail" && selected && (
          <div>
            <button className="no-print" onClick={() => { setView("list"); setSelected(null); }} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 13, marginBottom: 20 }}>← Torna alla lista</button>

            <div className="print-card" style={{ background: "#161616", border: "1px solid #252525", borderRadius: 12, padding: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
                <div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 28, color: "#e63946" }}>{selected.id}</div>
                  <div style={{ fontSize: 20, fontWeight: 600, marginTop: 4 }}>{selected.titolo}</div>
                  <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>Creata il {selected.dataCreazione}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className="badge" style={{ background: STATUS_COLORS[selected.stato] + "22", color: STATUS_COLORS[selected.stato], fontSize: 13 }}>{selected.stato}</span>
                  <div className="no-print" style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap", justifyContent: "flex-end" }}>
                    {["In attesa", "In lavorazione", "Completata", "Annullata"].map((s) => (
                      <button key={s} onClick={() => handleStatusChange(selected.id, s)} style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid", borderColor: selected.stato === s ? STATUS_COLORS[s] : "#2e2e2e", background: selected.stato === s ? STATUS_COLORS[s] + "22" : "transparent", color: selected.stato === s ? STATUS_COLORS[s] : "#555", fontSize: 11, cursor: "pointer" }}>{s}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 24 }}>
                <InfoGroup title="Cliente">
                  <InfoRow label="Nome" value={selected.cliente} />
                  <InfoRow label="Azienda" value={selected.azienda} />
                  <InfoRow label="Email" value={selected.email} />
                  <InfoRow label="Telefono" value={selected.telefono} />
                </InfoGroup>
                <InfoGroup title="Stampa">
                  <InfoRow label="Tipo" value={selected.tipo} />
                  <InfoRow label="Formato" value={selected.formato} />
                  <InfoRow label="Quantità" value={selected.quantita + " copie"} />
                  <InfoRow label="Colori" value={selected.colori} />
                </InfoGroup>
                <InfoGroup title="Materiali e Consegna">
                  <InfoRow label="Carta" value={selected.carta} />
                  <InfoRow label="Plastificatura" value={selected.plastificatura} />
                  <InfoRow label="Finitura" value={selected.finitura || "—"} />
                  <InfoRow label="Consegna" value={selected.consegna || "—"} />
                </InfoGroup>
              </div>

              {selected.note && (
                <div style={{ background: "#1c1c1c", borderLeft: "3px solid #e63946", borderRadius: "0 8px 8px 0", padding: "12px 16px", marginBottom: 24 }}>
                  <div style={{ fontSize: 11, color: "#666", marginBottom: 4, textTransform: "uppercase", letterSpacing: ".5px" }}>Note</div>
                  <div style={{ fontSize: 13, color: "#bbb" }}>{selected.note}</div>
                </div>
              )}

              <div className="no-print" style={{ display: "flex", gap: 12, borderTop: "1px solid #222", paddingTop: 20 }}>
                <button onClick={handlePrint} style={{ background: "#1c1c1c", border: "1px solid #2e2e2e", color: "#ccc", borderRadius: 8, padding: "10px 20px", fontSize: 13, cursor: "pointer" }}>🖨️ Stampa / PDF</button>
                <button onClick={() => handleDelete(selected.id)} style={{ background: "#ef444422", border: "1px solid #ef4444", color: "#ef4444", borderRadius: 8, padding: "10px 20px", fontSize: 13, cursor: "pointer" }}>🗑️ Elimina</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ background: "#161616", border: "1px solid #252525", borderRadius: 10, padding: 20 }}>
      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, marginBottom: 16, color: "#e63946", textTransform: "uppercase", letterSpacing: ".5px" }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div>
      <label style={{ fontSize: 11, color: "#666", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: ".5px" }}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ width: "100%", background: "#1c1c1c", border: "1px solid #2e2e2e", borderRadius: 7, padding: "9px 13px", color: "#f0ece4", fontSize: 13, fontFamily: "inherit" }} />
    </div>
  );
}

function FieldSelect({ label, value, options, onChange }) {
  return (
    <div>
      <label style={{ fontSize: 11, color: "#666", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: ".5px" }}>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", background: "#1c1c1c", border: "1px solid #2e2e2e", borderRadius: 7, padding: "9px 13px", color: "#f0ece4", fontSize: 13, fontFamily: "inherit", cursor: "pointer" }}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function InfoGroup({ title, children }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: "#e63946", textTransform: "uppercase", letterSpacing: ".5px", fontWeight: 700, marginBottom: 10 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: ".5px" }}>{label}</span>
      <span style={{ fontSize: 13, color: "#ccc", marginTop: 2 }}>{value || "—"}</span>
    </div>
  );
}
