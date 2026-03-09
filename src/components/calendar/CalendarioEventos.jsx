import { useState, useMemo } from "react"
import "./CalendarioEventos.css"

/* ─ ejemplos ─ */
const EVENTOS = [
  { id: 1, fecha: "2026-01-14", titulo: "Festival Jazz & Blues", categoria: "musica", lugar: "Plaza de España, S/C", precio: "GRATIS" },
  { id: 2, fecha: "2026-02-15", titulo: "La Casa de Bernarda Alba", categoria: "teatro", lugar: "Auditorio, S/C", precio: "12 €" },
  { id: 3, fecha: "2026-03-15", titulo: "Jam Session Nocturna", categoria: "musica", lugar: "La Noria, S/C", precio: "5 €" },
  { id: 4, fecha: "2026-03-18", titulo: "Muestra Arte Emergente", categoria: "arte", lugar: "TEA, Santa Cruz", precio: "GRATIS" },
  { id: 5, fecha: "2026-03-20", titulo: "Taller de Cerámica Canaria", categoria: "tradicion", lugar: "La Orotava", precio: "8 €" },
  { id: 6, fecha: "2026-03-22", titulo: "Noche Flamenca en el Puerto", categoria: "musica", lugar: "Plaza del Charco", precio: "8 €" },
  { id: 7, fecha: "2026-03-22", titulo: "Ciclo de Cine Documental", categoria: "cine", lugar: "Parque García Sanabria", precio: "GRATIS" },
  { id: 8, fecha: "2026-03-26", titulo: "Poesía en Vivo", categoria: "literatura",lugar: "Casa Lercaro, La Laguna", precio: "4 €" },
  { id: 9, fecha: "2026-03-28", titulo: "Ballet Contemporáneo: AGUA", categoria: "danza", lugar: "Teatro Guimerá", precio: "15 €" },
  { id: 10, fecha: "2026-03-30", titulo: "Feria de Artesanía del Norte", categoria: "tradicion", lugar: "La Orotava", precio: "GRATIS" },
  { id: 11, fecha: "2026-04-03", titulo: "Concierto Sinfónico de Primavera",categoria: "musica", lugar: "Auditorio, S/C", precio: "20 €" },
  { id: 12, fecha: "2026-04-10", titulo: "Exposición: Canarias en Blanco", categoria: "arte", lugar: "TEA, Santa Cruz", precio: "GRATIS" },
]

const CAT_CONFIG = {
  musica: { label: "MÚSICA", color: "#ff4d6d", textColor: "#f5f0e8" },
  teatro: { label: "TEATRO", color: "#7c3aed", textColor: "#f5f0e8" },
  arte: { label: "ARTE", color: "#22c55e", textColor: "#0a0a0a" },
  danza: { label: "DANZA", color: "#f5e642", textColor: "#0a0a0a" },
  cine: { label: "CINE", color: "#f5f0e8", textColor: "#0a0a0a" },
  tradicion: { label: "TRADICIÓN",  color: "#0a0a0a", textColor: "#f5f0e8" },
  literatura:{ label: "LITERATURA", color: "#3d5aff", textColor: "#f5f0e8" },
}

const DIAS_SEMANA = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"]
const MESES = [
  "ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO",
  "JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE",
]

function isoDate(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

function getDiasEnMes(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getPrimerDiaSemana(year, month) {
  // 0=lun … 6=dom
  const first = new Date(year, month, 1).getDay()
  return first === 0 ? 6 : first - 1
}

{/* ─ componente principal ─ */}
export default function CalendarioEventos() {
  const hoy = new Date()
  const [mes, setMes] = useState(hoy.getMonth())
  const [anyo, setAnyo] = useState(hoy.getFullYear())
  const [catActiva, setCatActiva] = useState("todo")
  const [diaSeleccionado, setDiaSeleccionado] = useState(null)

  {/* navegar mes */}
  const irMesAnterior = () => {
    if (mes === 0) { setMes(11); setAnyo(a => a - 1) }
    else setMes(m => m - 1)
    setDiaSeleccionado(null)
  }
  const irMesSiguiente = () => {
    if (mes === 11) { setMes(0); setAnyo(a => a + 1) }
    else setMes(m => m + 1)
    setDiaSeleccionado(null)
  }

  {/* filtrar eventos del mes actual y categoría */}
  const eventosFiltrados = useMemo(() => {
    return EVENTOS.filter(event => {
      const d = new Date(event.fecha + "T00:00:00")
      const mismoMes = d.getFullYear() === anyo && d.getMonth() === mes
      const mismacat = catActiva === "todo" || event.categoria === catActiva
      return mismoMes && mismacat
    })
  }, [mes, anyo, catActiva])

  {/* mapa día → eventos */}
  const eventosPorDia = useMemo(() => {
    const mapa = {}
    eventosFiltrados.forEach(ev => {
      const dia = parseInt(ev.fecha.split("-")[2])
      if (!mapa[dia]) mapa[dia] = []
      mapa[dia].push(ev)
    })
    return mapa
  }, [eventosFiltrados])

  {/* eventos del día seleccionado */}
  const eventosDia = diaSeleccionado ? (eventosPorDia[diaSeleccionado] ?? []) : []

  {/* construir grid de días */}
  const totalDias  = getDiasEnMes(anyo, mes)
  const offsetInicio = getPrimerDiaSemana(anyo, mes)
  const celdas = Array.from({ length: offsetInicio }, () => null)
    .concat(Array.from({ length: totalDias }, (_, i) => i + 1))
  while (celdas.length % 7 !== 0) celdas.push(null)

  const hoyStr = isoDate(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())

  return (
    <section className="cal">

      {/* ─ cabecera ─ */}
      <div className="cal_header">
        <div className="cal_title-wrap">
          <span className="cal_head">— AGENDA CULTURAL —</span>
          <h2 className="cal_title">CALENDARIO</h2>
        </div>
        <div className="cal_nav">
          <button className="cal_nav-btn" onClick={irMesAnterior} aria-label="Mes anterior">
            ←
          </button>
          <span className="cal_mes-label">
            {MESES[mes]} {anyo}
          </span>
          <button className="cal_nav-btn" onClick={irMesSiguiente} aria-label="Mes siguiente">
            →
          </button>
        </div>
      </div>

      {/* ─ filtros categoría ─ */}
      <div className="cal_filtros">
        <button
          className={`cal_pill${catActiva === "todo" ? " cal_pill--active" : ""}`}
          onClick={() => { setCatActiva("todo"); setDiaSeleccionado(null) }}
        >
          TODO
        </button>
        {Object.entries(CAT_CONFIG).map(([key, cfg]) => (
          <button
            key={key}
            className={`cal_pill${catActiva === key ? " cal_pill--active" : ""}`}
            style={catActiva === key ? { background: cfg.color, color: cfg.textColor, borderColor: cfg.color } : {}}
            onClick={() => { setCatActiva(key); setDiaSeleccionado(null) }}
          >
            {cfg.label}
          </button>
        ))}
      </div>

      {/* ─ cuerpo: grid + panel lateral ─ */}
      <div className="cal_body">

        {/* grid */}
        <div className="cal_grid-wrap">
          {/* días de la semana */}
          <div className="cal_semana">
            {DIAS_SEMANA.map(d => (
              <div key={d} className="cal_dia-label">{d}</div>
            ))}
          </div>

          {/* celdas */}
          <div className="cal_grid">
            {celdas.map((dia, i) => {
              if (!dia) return <div key={`empty-${i}`} className="cal_celda cal_celda--vacia" />

              const fechaCelda = isoDate(anyo, mes, dia)
              const esHoy = fechaCelda === hoyStr
              const eventos = eventosPorDia[dia] ?? []
              const seleccionado = diaSeleccionado === dia

              return (
                <button
                  key={dia}
                  className={[
                    "cal_celda",
                    esHoy? "cal_celda--hoy" : "",
                    seleccionado? "cal_celda--seleccionada": "",
                    eventos.length > 0 ? "cal_celda--con-eventos" : "",
                  ].join(" ")}
                  onClick={() => setDiaSeleccionado(dia === diaSeleccionado ? null : dia)}
                  aria-label={`${dia} de ${MESES[mes]}, ${eventos.length} eventos`}
                >
                  <span className="cal_num">{dia}</span>

                  {/* puntos de categorías */}
                  {eventos.length > 0 && (
                    <div className="cal_dots">
                      {eventos.slice(0, 3).map(ev => (
                        <span
                          key={ev.id}
                          className="cal_dot"
                          style={{ background: CAT_CONFIG[ev.categoria]?.color ?? "#0a0a0a" }}
                        />
                      ))}
                      {eventos.length > 3 && (
                        <span className="cal_dot-extra">+{eventos.length - 3}</span>
                      )}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* panel lateral */}
        <aside className={`cal_panel${diaSeleccionado ? " cal_panel--open" : ""}`}>
          {diaSeleccionado ? (
            <>
              <div className="cal_panel-header">
                <div>
                  <span className="cal_panel-dia">{diaSeleccionado}</span>
                  <span className="cal_panel-mes">{MESES[mes]} {anyo}</span>
                </div>
                <button
                  className="cal_panel-close"
                  onClick={() => setDiaSeleccionado(null)}
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>

              {eventosDia.length === 0 ? (
                <div className="cal_panel-vacio">
                  <span className="cal_panel-vacio-icon">○</span>
                  <p>Sin eventos este día para la categoría seleccionada.</p>
                </div>
              ) : (
                <ul className="cal_panel-lista">
                  {eventosDia.map(ev => {
                    const cfg = CAT_CONFIG[ev.categoria]
                    return (
                      <li key={ev.id} className="cal_evento">
                        <div className="cal_evento-top">
                          <span
                            className="cal_evento-tag"
                            style={{ background: cfg.color, color: cfg.textColor }}
                          >
                            {cfg.label}
                          </span>
                          <span
                            className={`cal_evento-precio${ev.precio === "GRATIS" ? " cal_evento-precio--gratis" : ""}`}
                          >
                            {ev.precio}
                          </span>
                        </div>
                        <h3 className="cal_evento-titulo">{ev.titulo}</h3>
                        <p className="cal_evento-lugar">📍 {ev.lugar}</p>
                        <a href="#" className="cal_evento-link">MÁS INFO →</a>
                      </li>
                    )
                  })}
                </ul>
              )}
            </>
          ) : (
            <div className="cal_panel-placeholder">
              <span className="cal_panel-placeholder-icon">★</span>
              <p>Selecciona un día con eventos para ver el detalle.</p>
              <p className="cal_panel-placeholder-sub">
                {eventosFiltrados.length} eventos en {MESES[mes]}
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* ─ leyenda ─ */}
      <div className="cal_leyenda">
        {Object.entries(CAT_CONFIG).map(([key, cfg]) => (
          <div key={key} className="cal_leyenda-item">
            <span className="cal_leyenda-dot" style={{ background: cfg.color }} />
            <span>{cfg.label.replace(/^..\s/, "")}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
