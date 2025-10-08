// Generador sencillo de archivos .ics (calendario) sin dependencias externas.
// NOTA: para producción considera una librería dedicada.
function fmt(dt) {
  const d = new Date(dt);
  const pad = (n)=> String(n).padStart(2, "0");
  const yyyy = d.getUTCFullYear();
  const mm = pad(d.getUTCMonth()+1);
  const dd = pad(d.getUTCDate());
  const hh = pad(d.getUTCHours());
  const mi = pad(d.getUTCMinutes());
  const ss = pad(d.getUTCSeconds());
  return `${yyyy}${mm}${dd}T${hh}${mi}${ss}Z`;
}

export function buildICS(events = [], { name = "Cultural Calendar" } = {}) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//UPB//Cultural//ES",
    `X-WR-CALNAME:${name}`
  ];
  for (const ev of events) {
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${ev.id || Math.random().toString(36).slice(2)}`);
    if (ev.startAt) lines.push(`DTSTART:${fmt(ev.startAt)}`);
    if (ev.endAt) lines.push(`DTEND:${fmt(ev.endAt)}`);
    lines.push(`SUMMARY:${(ev.title||"Evento").replace(/[\n\r]/g," ")}`);
    if (ev.location) lines.push(`LOCATION:${ev.location.replace(/[\n\r]/g," ")}`);
    if (ev.description) lines.push(`DESCRIPTION:${ev.description.replace(/[\n\r]/g," ")}`);
    lines.push("END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}
