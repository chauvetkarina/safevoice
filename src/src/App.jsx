import { useState, useEffect } from "react"

const F = "system-ui, sans-serif"
const C = {
  primary:"#1d2b75", light:"#c4d5f8", accent:"#4a6be4",
  mid:"#5b77d3", bg:"#F7F7F7", dark:"#0e1535",
  border:"#E8E8E8", muted:"#3A3A45", white:"#ffffff",
}

const MOCK = [
  { id:1, code:"AB3F-7K9M", categoria:"Acoso", departamento:"Comercial", descripcion:"El jefe de área repite chistes de contenido sexual en las reuniones semanales. Cuando alguien lo señala, lo ignora o hace comentarios irónicos frente a todo el equipo.", fecha_hecho:"Febrero 2026", tiene_testigos:true, contacto:null, estado:"nuevo", created_at:"2026-03-18", instructor:"María González", notas:[], mensajes:[{tipo:"sistema",texto:"Caso registrado con código AB3F-7K9M.",fecha:"18 mar · 09:14"}], historial:[{accion:"Caso recibido",autor:"Sistema",fecha:"18 mar · 09:14"}] },
  { id:2, code:"CC9X-2PQR", categoria:"Acoso", departamento:"Comercial", descripcion:"Mi supervisor hace comentarios inapropiados sobre mi apariencia física en reuniones de equipo, frente a otros compañeros. Ocurre desde noviembre.", fecha_hecho:"Noviembre 2025", tiene_testigos:true, contacto:null, estado:"en_revision", created_at:"2026-03-13", instructor:"María González", notas:["Verificar grabaciones de reuniones del lunes. Coordinar con IT de forma discreta."], mensajes:[{tipo:"sistema",texto:"Caso registrado con código CC9X-2PQR.",fecha:"13 mar · 09:14"},{tipo:"rrhh",texto:"Gracias por tu denuncia. Hemos iniciado la revisión. ¿Podés indicar en qué tipo de reunión ocurre esto?",fecha:"14 mar · 11:30"},{tipo:"denunciante",texto:"Son las reuniones de equipo de los lunes. Somos unas 12 personas y el jefe de área las conduce.",fecha:"15 mar · 16:45"}], historial:[{accion:"Caso recibido",autor:"Sistema",fecha:"13 mar · 09:14"},{accion:"Estado cambiado a En revisión",autor:"María González",fecha:"14 mar · 11:28"},{accion:"Nota interna agregada",autor:"María González",fecha:"14 mar · 11:35"}] },
  { id:3, code:"FT4D-8NJL", categoria:"Fraude", departamento:"Finanzas", descripcion:"Detecté que se duplicaron reembolsos de gastos en los reportes de dos ejecutivos senior del área. Las cifras no coinciden con los comprobantes.", fecha_hecho:"Febrero 2026", tiene_testigos:false, contacto:null, estado:"en_revision", created_at:"2026-03-10", instructor:"Carlos Méndez", notas:[], mensajes:[{tipo:"sistema",texto:"Caso registrado con código FT4D-8NJL.",fecha:"10 mar · 14:22"}], historial:[{accion:"Caso recibido",autor:"Sistema",fecha:"10 mar · 14:22"},{accion:"Estado cambiado a En revisión",autor:"María González",fecha:"11 mar · 09:00"}] },
  { id:4, code:"KP2W-5MFN", categoria:"Discriminación", departamento:"Comercial", descripcion:"No me asignaron el proyecto porque según el manager 'las mujeres no entienden de ese tipo de clientes'. Fue en una reunión de planificación.", fecha_hecho:"Marzo 2026", tiene_testigos:true, contacto:null, estado:"nuevo", created_at:"2026-03-08", instructor:"María González", notas:[], mensajes:[{tipo:"sistema",texto:"Caso registrado con código KP2W-5MFN.",fecha:"08 mar · 10:05"}], historial:[{accion:"Caso recibido",autor:"Sistema",fecha:"08 mar · 10:05"}] },
  { id:5, code:"ZR6Q-1YHB", categoria:"Fraude", departamento:"Finanzas", descripcion:"Hay facturas de un proveedor que no reconozco aprobadas sin proceso de compras formal. El monto acumulado supera los $40.000.", fecha_hecho:"Enero 2026", tiene_testigos:false, contacto:null, estado:"en_revision", created_at:"2026-03-05", instructor:"Carlos Méndez", notas:[], mensajes:[{tipo:"sistema",texto:"Caso registrado con código ZR6Q-1YHB.",fecha:"05 mar · 08:50"}], historial:[{accion:"Caso recibido",autor:"Sistema",fecha:"05 mar · 08:50"}] },
  { id:6, code:"MX8A-3VDK", categoria:"Inc. normativo", departamento:"RRHH", descripcion:"Los contratos nuevos no incluyen las cláusulas de protección de datos requeridas por GDPR. Ya se firmaron al menos 12 contratos con esta omisión.", fecha_hecho:"Enero 2026", tiene_testigos:false, contacto:"denunciante@empresa.com", estado:"resuelto", created_at:"2026-03-01", instructor:"Sofía Ríos", notas:["Revisado con legal. Contratos corregidos."], mensajes:[{tipo:"sistema",texto:"Caso registrado con código MX8A-3VDK.",fecha:"01 mar · 11:00"},{tipo:"rrhh",texto:"Hemos revisado el caso con el equipo legal. Se corregirán los contratos afectados.",fecha:"05 mar · 09:00"}], historial:[{accion:"Caso recibido",autor:"Sistema",fecha:"01 mar · 11:00"},{accion:"Estado cambiado a Resuelto",autor:"Sofía Ríos",fecha:"06 mar · 15:45"}] },
  { id:7, code:"QL7T-9CSW", categoria:"Acoso", departamento:"Marketing", descripcion:"Recibí mensajes fuera del horario laboral de mi manager exigiéndome responder inmediatamente bajo amenaza de afectar mi evaluación.", fecha_hecho:"Marzo 2026", tiene_testigos:false, contacto:null, estado:"en_revision", created_at:"2026-03-11", instructor:"Andrés Villalba", notas:[], mensajes:[{tipo:"sistema",texto:"Caso registrado con código QL7T-9CSW.",fecha:"11 mar · 17:30"}], historial:[{accion:"Caso recibido",autor:"Sistema",fecha:"11 mar · 17:30"}] },
  { id:8, code:"CR8L-4NWP", categoria:"Corrupción", departamento:"Compras", descripcion:"El responsable de compras favoreció a un proveedor con quien tiene relación personal sin declarar conflicto de interés.", fecha_hecho:"Febrero 2026", tiene_testigos:true, contacto:null, estado:"nuevo", created_at:"2026-03-15", instructor:"María González", notas:[], mensajes:[{tipo:"sistema",texto:"Caso registrado con código CR8L-4NWP.",fecha:"15 mar · 08:20"}], historial:[{accion:"Caso recibido",autor:"Sistema",fecha:"15 mar · 08:20"}] },
]

const INSTRUCTORES = [
  {id:1,nombre:"María González",area:"RRHH"},
  {id:2,nombre:"Carlos Méndez",area:"Legal"},
  {id:3,nombre:"Sofía Ríos",area:"Compliance"},
  {id:4,nombre:"Andrés Villalba",area:"RRHH"},
]
const CATEGORIAS = ["Acoso","Fraude","Discriminación","Inc. normativo","Corrupción","Conducta inap."]
const DEPARTAMENTOS = ["Comercial","Finanzas","Marketing","RRHH","Tecnología","Operaciones","Compras","Legal"]
const ORIGENES = [{id:"en_persona",label:"En persona"},{id:"telefono",label:"Teléfono"},{id:"email",label:"Email"},{id:"buzon_fisico",label:"Buzón físico"},{id:"deteccion_interna",label:"Detección interna"}]
const CAT_COLOR = {Acoso:"#4a6be4",Fraude:"#c4d5f8",Discriminación:"#1d2b75","Inc. normativo":"#c4d5f8",Corrupción:"#3A3A45","Conducta inap.":"#E8E8E8"}

const diasAbierto = d => Math.floor((Date.now() - new Date(d+"T00:00:00Z")) / 86400000)
const slaStatus = c => {
  if (c.estado==="resuelto"||c.estado==="archivado") return "ok"
  const d = diasAbierto(c.created_at)
  if (d>=7) return "danger"
  if (d>=5) return "warn"
  return "ok"
}
const ahora = () => { const d=new Date(); return `${d.getDate()} mar · ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}` }
const generarCodigo = () => { const ch="ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; const r=()=>ch[Math.floor(Math.random()*ch.length)]; return `${r()}${r()}${r()}${r()}-${r()}${r()}${r()}${r()}` }
const ESTADO_LABEL = {nuevo:"NUEVO",en_revision:"EN REVISIÓN",resuelto:"RESUELTO",archivado:"ARCHIVADO",desestimado:"DESESTIMADO"}

function BadgeEstado({estado}) {
  const styles = {
    nuevo:       {background:"#eef1fb", color:"#1d2b75"},
    en_revision: {background:"#c4d5f8", color:"#1d2b75"},
    resuelto:    {background:"#cff6d6", color:"#296735"},
    archivado:   {background:"#F7F7F7", color:"#3A3A45", border:"1px solid #E8E8E8"},
    desestimado: {background:"#F7F7F7", color:"#3A3A45", border:"1px solid #E8E8E8"},
  }
  const base = {display:"inline-flex",alignItems:"center",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:99,letterSpacing:".03em",fontFamily:F}
  return <span style={{...base,...(styles[estado]||styles.archivado)}}>{ESTADO_LABEL[estado]||estado}</span>
}

function SlaDot({caso}) {
  const st = slaStatus(caso)
  const d = diasAbierto(caso.created_at)
  if (st==="danger") return <span style={{display:"inline-flex",alignItems:"center",gap:5,color:C.primary,fontSize:12,fontWeight:700,fontFamily:F}}><span style={{width:8,height:8,borderRadius:"50%",background:C.primary,flexShrink:0}}/> Vencido</span>
  if (st==="warn")   return <span style={{display:"inline-flex",alignItems:"center",gap:5,color:C.mid,fontSize:12,fontWeight:600,fontFamily:F}}><span style={{width:8,height:8,borderRadius:"50%",background:C.accent,flexShrink:0}}/> {7-d}d</span>
  return <span style={{display:"inline-flex",alignItems:"center",gap:5}}><span style={{width:8,height:8,borderRadius:"50%",background:C.light,border:`1.5px solid ${C.accent}`,flexShrink:0}}/></span>
}

export default function App() {
  const [casos, setCasos] = useState(MOCK)
  const [vista, setVista] = useState("casos")
  const [casoActivo, setCasoActivo] = useState(null)
  const [filtro, setFiltro] = useState("todos")
  const [nuevoMsg, setNuevoMsg] = useState("")
  const [nuevaNota, setNuevaNota] = useState("")
  const [tabChat, setTabChat] = useState("responder")
  const [modalReasignar, setModalReasignar] = useState(false)
  const [instructorSel, setInstructorSel] = useState("")
  const [modalNuevoCaso, setModalNuevoCaso] = useState(false)
  const [nuevoCaso, setNuevoCaso] = useState({categoria:"",departamento:"",descripcion:"",fecha_hecho:"",tiene_testigos:false,contacto:"",origen:"en_persona"})
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loadingAI, setLoadingAI] = useState(false)
  const [sugerenciaAI, setSugerenciaAI] = useState(null)
  const [loadingSug, setLoadingSug] = useState(false)
  const [consulta, setConsulta] = useState("")
  const [respuesta, setRespuesta] = useState(null)
  const [loadingConsulta, setLoadingConsulta] = useState(false)

  const SUGERENCIAS = ["¿Cuántos casos de acoso hay en Comercial?","¿Qué categoría es más común en Finanzas?","¿Cuántos casos están vencidos?","¿Qué departamento tiene más denuncias?"]

  const agregarHistorial = (id, accion) => {
    const e = {accion, autor:"María González", fecha:ahora()}
    setCasos(p=>p.map(c=>c.id===id?{...c,historial:[...c.historial,e]}:c))
    setCasoActivo(p=>p?.id===id?{...p,historial:[...p.historial,e]}:p)
  }

  const actualizarEstado = (id, est) => {
    const lbl = {nuevo:"Nuevo",en_revision:"En revisión",resuelto:"Resuelto",archivado:"Archivado",desestimado:"Desestimado"}
    setCasos(p=>p.map(c=>c.id===id?{...c,estado:est}:c))
    setCasoActivo(p=>p?.id===id?{...p,estado:est}:p)
    agregarHistorial(id,`Estado cambiado a ${lbl[est]}`)
  }

  const abrirCaso = c => {
    setCasoActivo({...c}); setSugerenciaAI(null); setVista("detalle")
    if(c.estado==="nuevo") pedirSugerencia(c)
  }

  const enviarMensaje = id => {
    if (!nuevoMsg.trim()) return
    const m = {tipo:tabChat==="responder"?"rrhh":"nota", texto:nuevoMsg, fecha:ahora()}
    setCasos(p=>p.map(c=>c.id===id?{...c,mensajes:[...c.mensajes,m]}:c))
    setCasoActivo(p=>p?{...p,mensajes:[...p.mensajes,m]}:p)
    agregarHistorial(id, tabChat==="responder"?"Mensaje enviado al denunciante":"Nota interna agregada")
    setNuevoMsg("")
  }

  const reasignar = () => {
    if (!instructorSel) return
    const inst = INSTRUCTORES.find(i=>i.id===Number(instructorSel))
    const m = {tipo:"sistema", texto:`Caso reasignado a ${inst.nombre} (${inst.area}).`, fecha:ahora()}
    setCasos(p=>p.map(c=>c.id===casoActivo.id?{...c,instructor:inst.nombre,mensajes:[...c.mensajes,m]}:c))
    setCasoActivo(p=>({...p,instructor:inst.nombre,mensajes:[...p.mensajes,m]}))
    agregarHistorial(casoActivo.id,`Caso reasignado a ${inst.nombre} (${inst.area})`)
    setModalReasignar(false); setInstructorSel("")
  }

  const crearCasoManual = () => {
    if (!nuevoCaso.categoria||!nuevoCaso.departamento||!nuevoCaso.descripcion) return
    const code = generarCodigo()
    const c = {id:Date.now(), code, ...nuevoCaso, estado:"nuevo", created_at:new Date().toISOString().split("T")[0], notas:[`Caso cargado manualmente por RRHH · Origen: ${ORIGENES.find(o=>o.id===nuevoCaso.origen)?.label}`], mensajes:[{tipo:"sistema",texto:`Caso registrado manualmente por RRHH.`,fecha:ahora()}], historial:[{accion:"Caso cargado manualmente por RRHH",autor:"María González",fecha:ahora()}] }
    setCasos(p=>[c,...p]); setModalNuevoCaso(false)
    setNuevoCaso({categoria:"",departamento:"",descripcion:"",fecha_hecho:"",tiene_testigos:false,contacto:"",origen:"en_persona"})
  }

  const pedirSugerencia = async caso => {
    setLoadingSug(true); setSugerenciaAI(null)
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:`Sos un experto en compliance de RRHH. Analizá esta denuncia y respondé SOLO en JSON sin backticks:\n{"urgencia":"alta|media|baja","urgencia_razon":"string","instructor_recomendado":"string","instructor_razon":"string","pasos_sugeridos":["string"],"riesgos":["string"],"tiempo_estimado":"string"}\nCategoría: ${caso.categoria}, Departamento: ${caso.departamento}, Descripción: ${caso.descripcion}, Testigos: ${caso.tiene_testigos?'Sí':'No'}`}]})})
      const data = await res.json()
      const txt = data.content[0].text.replace(/```json|```/g,"").trim()
      setSugerenciaAI(JSON.parse(txt))
    } catch { setSugerenciaAI({error:true}) }
    setLoadingSug(false)
  }

  const simularAnalytics = () => {
    setLoadingAI(true)
    setTimeout(()=>{
      setAnalyticsData({
        resumen:"El canal registra una concentración crítica de denuncias en Comercial (4 casos), con un patrón recurrente de acoso. Finanzas presenta dos casos de posible fraude que requieren investigación conjunta.",
        patrones:[{titulo:"Acoso recurrente en reuniones",desc:"3 denuncias en Comercial con el mismo perfil jerárquico.",sev:"alta",deptos:["Comercial"]},{titulo:"Posible fraude coordinado",desc:"2 denuncias en Finanzas con irregularidades relacionadas.",sev:"alta",deptos:["Finanzas"]},{titulo:"Discriminación por género",desc:"2 casos en distintos departamentos. Revisar políticas.",sev:"media",deptos:["Comercial","Finanzas"]}],
        alertas:[{tipo:"SLA legal vencido",msg:"2 casos superan 7 días sin acuse de recibo.",accion:"Ver casos vencidos"},{tipo:"Concentración en Comercial",msg:"4 denuncias en 30 días. Investigación formal recomendada.",accion:"Filtrar Comercial"}],
        porCat:[{cat:"Acoso",n:3},{cat:"Fraude",n:2},{cat:"Discriminación",n:1},{cat:"Inc. normativo",n:1},{cat:"Corrupción",n:1}],
        porDepto:[{d:"Comercial",n:4,r:"alto"},{d:"Finanzas",n:2,r:"alto"},{d:"Marketing",n:1,r:"medio"},{d:"Compras",n:1,r:"medio"},{d:"RRHH",n:1,r:"bajo"}]
      })
      setLoadingAI(false)
    },2000)
  }

  const consultarCasos = async preg => {
    if (!preg.trim()) return
    setLoadingConsulta(true); setRespuesta(null)
    const datos = casos.map(c=>({codigo:c.code,categoria:c.categoria,departamento:c.departamento,estado:c.estado,dias:diasAbierto(c.created_at),testigos:c.tiene_testigos}))
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:500,messages:[{role:"user",content:`Sos analista de RRHH. Datos: ${JSON.stringify(datos)}. Respondé en texto natural sin markdown: ${preg}`}]})})
      const data = await res.json()
      setRespuesta({texto:data.content[0].text, preg})
    } catch { setRespuesta({error:true,preg}) }
    setLoadingConsulta(false)
  }

  const casosFiltrados = casos.filter(c=>{
    if (filtro==="todos") return true
    if (filtro==="nuevos") return c.estado==="nuevo"
    if (filtro==="en_revision") return c.estado==="en_revision"
    if (filtro==="resueltos") return c.estado==="resuelto"
    if (filtro==="vencidos") return slaStatus(c)==="danger"
    return true
  })
  const totales = {total:casos.length,sinAtender:casos.filter(c=>c.estado==="nuevo").length,vencidos:casos.filter(c=>slaStatus(c)==="danger").length,resueltos:casos.filter(c=>c.estado==="resuelto").length}

  const inp = {fontSize:13,padding:"8px 12px",borderRadius:8,border:`1px solid ${C.border}`,background:C.bg,color:C.dark,fontFamily:F,width:"100%",boxSizing:"border-box"}
  const selSt = {fontSize:13,padding:"6px 10px",borderRadius:7,border:`1px solid ${C.border}`,background:C.bg,color:C.dark,fontFamily:F,width:"100%",cursor:"pointer"}
  const btnP = {background:C.primary,color:C.light,border:"none",fontSize:12,fontWeight:600,padding:"7px 14px",borderRadius:7,cursor:"pointer",fontFamily:F}
  const btnG = {background:C.bg,color:C.primary,border:`1px solid ${C.border}`,fontSize:12,fontWeight:600,padding:"7px 14px",borderRadius:7,cursor:"pointer",fontFamily:F}

  return (
    <div style={{display:"flex",height:"100vh",background:C.bg,fontFamily:F,overflow:"hidden"}}>

      {/* Sidebar */}
      <div style={{width:220,background:C.white,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",flexShrink:0}}>
        <div style={{padding:"14px 16px 12px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:8}}>
          <span style={{background:C.primary,color:"#fff",fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:6}}>hu</span>
          <span style={{background:C.bg,color:C.muted,fontSize:11,padding:"3px 9px",borderRadius:6,border:`1px solid ${C.border}`}}>admin</span>
        </div>
        <div style={{flex:1,padding:"8px 0"}}>
          {[["Inicio","M2 4h12M2 8h8M2 12h10"],["Personas","M8 9a3 3 0 100-6 3 3 0 000 6zm-5 6a5 5 0 0110 0"]].map(([l,p])=>(
            <div key={l} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 16px",fontSize:13,color:C.muted,cursor:"pointer",borderLeft:"3px solid transparent"}}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round"><path d={p}/></svg>
              <span>{l}</span>
            </div>
          ))}
          <div style={{height:1,background:C.border,margin:"6px 16px"}}/>
          <div style={{display:"flex",alignItems:"center",gap:9,padding:"8px 16px",fontSize:13,color:C.primary,fontWeight:600,background:"#eef1fb",cursor:"pointer",borderLeft:`3px solid ${C.primary}`}}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill={C.primary}><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a1 1 0 110 2 1 1 0 010-2zm0 3.5a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 7.5z"/></svg>
            <span>Canal de denuncias</span>
            <span style={{marginLeft:"auto",background:C.primary,color:C.light,fontSize:10,fontWeight:700,padding:"1px 7px",borderRadius:99}}>{totales.vencidos}</span>
          </div>
          <div style={{padding:"5px 16px 5px 40px",fontSize:12,color:vista==="casos"?C.accent:C.muted,fontWeight:vista==="casos"?600:400,cursor:"pointer"}} onClick={()=>setVista("casos")}>· Casos</div>
          <div style={{padding:"5px 16px 5px 40px",fontSize:12,color:vista==="analytics"?C.accent:C.muted,fontWeight:vista==="analytics"?600:400,cursor:"pointer"}} onClick={()=>{setVista("analytics");if(!analyticsData)simularAnalytics()}}>· AI Analytics</div>
          <div style={{padding:"5px 16px 5px 40px",fontSize:12,color:C.muted,cursor:"pointer"}}>· Configuración</div>
        </div>
      </div>

      {/* Main */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"}}>

        {/* VISTA: CASOS */}
        {vista==="casos" && <>
          <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"14px 24px",display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
            <div>
              <div style={{fontSize:20,fontWeight:700,color:C.dark,letterSpacing:"-.02em"}}>Canal de denuncias</div>
              <div style={{fontSize:12,color:C.muted,marginTop:2}}>{totales.total} casos · Última actualización hoy 11:42</div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button style={btnG} onClick={()=>{setVista("analytics");if(!analyticsData)simularAnalytics()}}>AI Analytics</button>
              <button style={btnP} onClick={()=>setModalNuevoCaso(true)}>+ Nuevo caso</button>
            </div>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"20px 24px",display:"flex",flexDirection:"column",gap:16}}>
            {totales.vencidos>0 && <div style={{background:C.white,border:`1px solid ${C.border}`,borderLeft:`3px solid ${C.accent}`,borderRadius:8,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,fontSize:12,color:C.dark}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:C.mid,flexShrink:0}}/>
              <span><strong>{totales.vencidos} casos superan el límite de 7 días</strong> sin acuse de recibo — Ley 2/2023.</span>
              <span style={{marginLeft:"auto",color:C.mid,fontWeight:600,cursor:"pointer"}} onClick={()=>setFiltro("vencidos")}>Ver urgentes →</span>
            </div>}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:10}}>
              {[["Total",totales.total,"+3 este mes",null],["Sin atender",totales.sinAtender,"Requieren acción",C.accent],["SLA vencido",totales.vencidos,"+7 días sin respuesta",C.mid],["Resueltos",totales.resueltos,`${Math.round(totales.resueltos/totales.total*100)}% del total`,null]].map(([l,v,sub,col])=>(
                <div key={l} style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 16px"}}>
                  <div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:".05em",marginBottom:8}}>{l}</div>
                  <div style={{fontSize:26,fontWeight:700,color:col||C.dark}}>{v}</div>
                  <div style={{fontSize:11,color:col||C.muted,marginTop:4}}>{sub}</div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {[["todos","Todos"],["nuevos","Nuevos"],["en_revision","En revisión"],["resueltos","Resueltos"],["vencidos","⚠ Vencidos"]].map(([k,l])=>(
                <button key={k} style={{fontSize:12,padding:"5px 13px",borderRadius:99,border:filtro===k?`1px solid ${C.accent}`:`1px solid ${C.border}`,color:filtro===k?C.primary:C.muted,background:filtro===k?"#eef1fb":C.white,cursor:"pointer",fontWeight:filtro===k?600:400,fontFamily:F}} onClick={()=>setFiltro(k)}>{l}</button>
              ))}
            </div>
            <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr>{["Código","Categoría","Departamento","Recibida","Días","SLA","Estado",""].map(h=><th key={h} style={{fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:".05em",padding:"10px 14px",textAlign:"left",background:"#fafbfc",borderBottom:`1px solid ${C.border}`}}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {casosFiltrados.map(c=>(
                    <tr key={c.id} onClick={()=>abrirCaso(c)} style={{cursor:"pointer"}}>
                      <td style={{fontSize:13,color:C.dark,padding:"11px 14px",borderBottom:`1px solid ${C.bg}`,verticalAlign:"middle"}}><span style={{fontFamily:"monospace",fontSize:11,color:C.muted,background:C.bg,padding:"3px 8px",borderRadius:5,border:`1px solid ${C.border}`}}>{c.code}</span></td>
                      <td style={{fontSize:13,color:C.dark,padding:"11px 14px",borderBottom:`1px solid ${C.bg}`,verticalAlign:"middle"}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{width:8,height:8,borderRadius:"50%",background:CAT_COLOR[c.categoria]||C.muted,flexShrink:0}}/>{c.categoria}</div></td>
                      <td style={{fontSize:13,color:C.dark,padding:"11px 14px",borderBottom:`1px solid ${C.bg}`,verticalAlign:"middle"}}>{c.departamento}</td>
                      <td style={{fontSize:13,color:C.dark,padding:"11px 14px",borderBottom:`1px solid ${C.bg}`,verticalAlign:"middle"}}>{c.created_at.slice(5).split("-").reverse().join(" mar ")}</td>
                      <td style={{fontSize:13,color:C.dark,padding:"11px 14px",borderBottom:`1px solid ${C.bg}`,verticalAlign:"middle"}}>{diasAbierto(c.created_at)}d</td>
                      <td style={{fontSize:13,color:C.dark,padding:"11px 14px",borderBottom:`1px solid ${C.bg}`,verticalAlign:"middle"}}><SlaDot caso={c}/></td>
                      <td style={{fontSize:13,color:C.dark,padding:"11px 14px",borderBottom:`1px solid ${C.bg}`,verticalAlign:"middle"}}><BadgeEstado estado={c.estado}/></td>
                      <td style={{fontSize:18,color:C.border,padding:"11px 14px",borderBottom:`1px solid ${C.bg}`,letterSpacing:1}}>⋮</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal nuevo caso */}
          {modalNuevoCaso && <div style={{position:"absolute",inset:0,background:"rgba(14,21,53,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}}>
            <div style={{background:C.white,borderRadius:12,padding:28,width:480,maxHeight:"90vh",overflowY:"auto",border:`1px solid ${C.border}`}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
                <div style={{fontSize:16,fontWeight:700,color:C.dark}}>Nuevo caso manual</div>
                <button style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:C.muted}} onClick={()=>setModalNuevoCaso(false)}>✕</button>
              </div>
              <div style={{fontSize:12,color:C.muted,marginBottom:20}}>Para denuncias recibidas fuera del canal digital.</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                <div><div style={{fontSize:11,color:C.muted,marginBottom:4}}>Categoría *</div><select style={selSt} value={nuevoCaso.categoria} onChange={e=>setNuevoCaso(p=>({...p,categoria:e.target.value}))}><option value="">Seleccionar...</option>{CATEGORIAS.map(c=><option key={c}>{c}</option>)}</select></div>
                <div><div style={{fontSize:11,color:C.muted,marginBottom:4}}>Departamento *</div><select style={selSt} value={nuevoCaso.departamento} onChange={e=>setNuevoCaso(p=>({...p,departamento:e.target.value}))}><option value="">Seleccionar...</option>{DEPARTAMENTOS.map(d=><option key={d}>{d}</option>)}</select></div>
              </div>
              <div style={{marginBottom:12}}><div style={{fontSize:11,color:C.muted,marginBottom:4}}>Descripción *</div><textarea style={{...inp,resize:"none",minHeight:80}} value={nuevoCaso.descripcion} onChange={e=>setNuevoCaso(p=>({...p,descripcion:e.target.value}))} placeholder="Describí los hechos..."/></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                <div><div style={{fontSize:11,color:C.muted,marginBottom:4}}>Fecha aproximada</div><input style={{...inp,height:36,padding:"7px 12px"}} value={nuevoCaso.fecha_hecho} onChange={e=>setNuevoCaso(p=>({...p,fecha_hecho:e.target.value}))} placeholder="Ej: Febrero 2026"/></div>
                <div><div style={{fontSize:11,color:C.muted,marginBottom:4}}>Origen</div><select style={selSt} value={nuevoCaso.origen} onChange={e=>setNuevoCaso(p=>({...p,origen:e.target.value}))}>{ORIGENES.map(o=><option key={o.id} value={o.id}>{o.label}</option>)}</select></div>
              </div>
              <div style={{marginBottom:12}}><div style={{fontSize:11,color:C.muted,marginBottom:4}}>Contacto (opcional)</div><input style={{...inp,height:36,padding:"7px 12px"}} value={nuevoCaso.contacto} onChange={e=>setNuevoCaso(p=>({...p,contacto:e.target.value}))} placeholder="Email o nombre si lo proporcionó"/></div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20,padding:"10px 12px",background:C.bg,borderRadius:8,border:`1px solid ${C.border}`}}>
                <input type="checkbox" checked={nuevoCaso.tiene_testigos} onChange={e=>setNuevoCaso(p=>({...p,tiene_testigos:e.target.checked}))} style={{accentColor:C.primary,width:14,height:14}}/>
                <span style={{fontSize:13,color:C.dark}}>El denunciante mencionó testigos</span>
              </div>
              <div style={{background:"#eef1fb",border:`1px solid ${C.light}`,borderRadius:8,padding:"10px 12px",marginBottom:20,fontSize:12,color:C.muted,lineHeight:1.6}}>
                Caso cargado por RRHH. No se generará código de seguimiento para el denunciante.
              </div>
              <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                <button style={btnG} onClick={()=>setModalNuevoCaso(false)}>Cancelar</button>
                <button style={{...btnP,opacity:nuevoCaso.categoria&&nuevoCaso.departamento&&nuevoCaso.descripcion?1:0.5}} onClick={crearCasoManual}>Registrar caso</button>
              </div>
            </div>
          </div>}
        </>}

        {/* VISTA: DETALLE */}
        {vista==="detalle" && casoActivo && <>
          <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"13px 20px",display:"flex",alignItems:"center",gap:10,position:"relative",flexShrink:0}}>
            <button style={{...btnG,fontSize:12}} onClick={()=>setVista("casos")}>← Casos</button>
            <span style={{fontSize:15,fontWeight:700,color:C.dark}}>Detalle del caso</span>
            <span style={{fontFamily:"monospace",fontSize:12,color:C.muted,background:C.bg,padding:"3px 8px",borderRadius:5,border:`1px solid ${C.border}`}}>{casoActivo.code}</span>
            <div style={{marginLeft:"auto",display:"flex",gap:8,alignItems:"center"}}>
              <BadgeEstado estado={casoActivo.estado}/>
              <button style={btnG} onClick={()=>setModalReasignar(true)}>Reasignar</button>
              <button style={btnP} onClick={()=>actualizarEstado(casoActivo.id,"resuelto")}>Cerrar caso</button>
            </div>
            {modalReasignar && <div style={{position:"fixed",inset:0,background:"rgba(14,21,53,0.35)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
              <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:24,width:340}}>
                <div style={{fontSize:15,fontWeight:700,color:C.dark,marginBottom:4}}>Reasignar caso</div>
                <div style={{fontSize:12,color:C.muted,marginBottom:16}}>Seleccioná el nuevo instructor.</div>
                <div style={{fontSize:11,color:C.muted,marginBottom:6}}>Instructor actual</div>
                <div style={{fontSize:13,color:C.dark,background:C.bg,border:`1px solid ${C.border}`,borderRadius:7,padding:"8px 12px",marginBottom:14}}>{casoActivo.instructor}</div>
                <div style={{fontSize:11,color:C.muted,marginBottom:6}}>Nuevo instructor</div>
                <select style={{...selSt,marginBottom:16}} value={instructorSel} onChange={e=>setInstructorSel(e.target.value)}>
                  <option value="">Seleccionar...</option>
                  {INSTRUCTORES.map(i=><option key={i.id} value={i.id}>{i.nombre} — {i.area}</option>)}
                </select>
                <div style={{fontSize:11,color:C.muted,marginBottom:14,background:"#eef1fb",padding:"8px 12px",borderRadius:7}}>El cambio quedará en el historial con timestamp.</div>
                <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                  <button style={btnG} onClick={()=>{setModalReasignar(false);setInstructorSel("")}}>Cancelar</button>
                  <button style={{...btnP,opacity:instructorSel?1:0.5}} onClick={reasignar}>Confirmar</button>
                </div>
              </div>
            </div>}
          </div>
          <div style={{display:"flex",flex:1,overflow:"hidden"}}>
            {/* Panel izquierdo */}
            <div style={{width:300,minWidth:300,background:C.white,borderRight:`1px solid ${C.border}`,overflowY:"auto",display:"flex",flexDirection:"column"}}>
              {[
                {title:"Clasificación", content: <>
                  <div style={{marginBottom:10}}><div style={{fontSize:11,color:C.muted,marginBottom:4}}>Categoría</div><span style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:600,color:C.primary,background:"#eef1fb",padding:"4px 12px",borderRadius:99}}><span style={{width:8,height:8,borderRadius:"50%",background:CAT_COLOR[casoActivo.categoria]||C.mid}}/>{casoActivo.categoria}</span></div>
                  <div style={{marginBottom:10}}><div style={{fontSize:11,color:C.muted,marginBottom:3}}>Departamento</div><div style={{fontSize:13,color:C.dark}}>{casoActivo.departamento}</div></div>
                  <div><div style={{fontSize:11,color:C.muted,marginBottom:3}}>Fecha del hecho</div><div style={{fontSize:13,color:C.dark}}>{casoActivo.fecha_hecho}</div></div>
                </>},
                {title:"Descripción", content: <>
                  <div style={{fontSize:13,color:C.dark,background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 12px",lineHeight:1.6}}>{casoActivo.descripcion}</div>
                  <div style={{marginTop:10}}><div style={{fontSize:11,color:C.muted,marginBottom:3}}>Testigos</div><div style={{fontSize:13,color:C.dark}}>{casoActivo.tiene_testigos?"Sí (sin identificar)":"No"}</div></div>
                </>},
                {title:"Identidad", content:<div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:C.muted}}>🔒 {casoActivo.contacto||"Anónimo · sin datos de contacto"}</div>},
                {title:"Plazo SLA", content: <>
                  <div style={{fontSize:11,color:C.muted,marginBottom:4}}>Recibida el {casoActivo.created_at} · {diasAbierto(casoActivo.created_at)} días abierto</div>
                  <div style={{height:5,background:C.bg,borderRadius:99,overflow:"hidden"}}><div style={{height:"100%",borderRadius:99,background:slaStatus(casoActivo)==="danger"?C.primary:C.accent,width:`${Math.min(100,diasAbierto(casoActivo.created_at)/7*100)}%`}}/></div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.muted,marginTop:3}}><span>{diasAbierto(casoActivo.created_at)} días</span><span>{Math.max(0,7-diasAbierto(casoActivo.created_at))} restantes</span></div>
                </>},
                {title:"Estado y asignación", content: <>
                  <div style={{marginBottom:10}}><div style={{fontSize:11,color:C.muted,marginBottom:4}}>Estado actual</div><select style={selSt} value={casoActivo.estado} onChange={e=>actualizarEstado(casoActivo.id,e.target.value)}>{["nuevo","en_revision","resuelto","archivado","desestimado"].map(o=><option key={o} value={o}>{ESTADO_LABEL[o]}</option>)}</select></div>
                  <div><div style={{fontSize:11,color:C.muted,marginBottom:4}}>Instructor asignado</div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <div style={{width:28,height:28,borderRadius:"50%",background:"#eef1fb",color:C.primary,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{(casoActivo.instructor||"").split(" ").map(n=>n[0]).slice(0,2).join("")}</div>
                        <div><div style={{fontSize:13,color:C.dark,fontWeight:500}}>{casoActivo.instructor}</div><div style={{fontSize:11,color:C.muted}}>{INSTRUCTORES.find(i=>i.nombre===casoActivo.instructor)?.area||"RRHH"}</div></div>
                      </div>
                      <button style={{...btnG,fontSize:11,padding:"4px 10px"}} onClick={()=>setModalReasignar(true)}>Cambiar</button>
                    </div>
                  </div>
                </>},
                {title:"Notas internas", content: <>
                  {casoActivo.notas.map((n,i)=><div key={i} style={{background:C.white,border:`1px solid ${C.border}`,borderLeft:`3px solid ${C.accent}`,borderRadius:8,padding:"10px 12px",fontSize:12,color:C.mid,lineHeight:1.5,marginBottom:6}}>{n}</div>)}
                  <textarea style={{...inp,resize:"none"}} rows={2} placeholder="Agregar nota confidencial..." value={nuevaNota} onChange={e=>setNuevaNota(e.target.value)}/>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:6}}>
                    <span style={{fontSize:11,color:C.muted}}>No visible para el denunciante</span>
                    <button style={{...btnG,fontSize:11,padding:"4px 10px"}} onClick={()=>{if(nuevaNota.trim()){setCasoActivo(p=>({...p,notas:[...p.notas,nuevaNota]}));agregarHistorial(casoActivo.id,"Nota interna agregada");setNuevaNota("")}}}>Guardar</button>
                  </div>
                </>},
                {title:"Historial de auditoría", content: <>
                  {[...casoActivo.historial].reverse().map((h,i)=>(
                    <div key={i} style={{display:"flex",gap:10,paddingBottom:10,marginBottom:10,borderBottom:i<casoActivo.historial.length-1?`1px solid ${C.border}`:"none",alignItems:"flex-start"}}>
                      <span style={{width:6,height:6,borderRadius:"50%",background:C.accent,flexShrink:0,marginTop:5}}/>
                      <div><div style={{fontSize:12,color:C.dark,lineHeight:1.5}}>{h.accion}</div><div style={{fontSize:11,color:C.muted,marginTop:2}}>{h.autor} · {h.fecha}</div></div>
                    </div>
                  ))}
                </>},
              ].map(({title,content})=>(
                <div key={title} style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`}}>
                  <div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:".07em",marginBottom:10}}>{title}</div>
                  {content}
                </div>
              ))}

              {(loadingSug||sugerenciaAI) && <div style={{padding:"14px 16px",borderTop:`2px solid ${C.accent}`}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
                  <span style={{width:7,height:7,borderRadius:"50%",background:C.accent,flexShrink:0}}/>
                  <div style={{fontSize:10,fontWeight:700,color:C.mid,textTransform:"uppercase",letterSpacing:".07em"}}>Sugerencia AI</div>
                </div>
                {loadingSug && <div style={{fontSize:12,color:C.muted,textAlign:"center",padding:"12px 0"}}>Analizando el caso...</div>}
                {sugerenciaAI&&!sugerenciaAI.error&&<>
                  <div style={{background:"#eef1fb",border:`1px solid ${C.light}`,borderRadius:8,padding:"10px 12px",marginBottom:10}}>
                    <div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>Urgencia</div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{width:8,height:8,borderRadius:"50%",background:sugerenciaAI.urgencia==="alta"?C.primary:sugerenciaAI.urgencia==="media"?C.mid:C.accent}}/><span style={{fontSize:13,fontWeight:700,color:C.primary,textTransform:"capitalize"}}>{sugerenciaAI.urgencia}</span></div>
                    <div style={{fontSize:12,color:C.muted,marginTop:4,lineHeight:1.5}}>{sugerenciaAI.urgencia_razon}</div>
                  </div>
                  <div style={{marginBottom:10}}><div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:".05em",marginBottom:6}}>Instructor recomendado</div>
                    <div style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 12px"}}><div style={{fontSize:13,fontWeight:600,color:C.dark}}>{sugerenciaAI.instructor_recomendado}</div><div style={{fontSize:12,color:C.muted,marginTop:3,lineHeight:1.5}}>{sugerenciaAI.instructor_razon}</div></div>
                  </div>
                  <div style={{marginBottom:10}}><div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:".05em",marginBottom:6}}>Pasos sugeridos</div>
                    {sugerenciaAI.pasos_sugeridos?.map((p,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:6,alignItems:"flex-start"}}><span style={{width:18,height:18,borderRadius:"50%",background:"#eef1fb",color:C.primary,fontSize:10,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{i+1}</span><span style={{fontSize:12,color:C.dark,lineHeight:1.5}}>{p}</span></div>)}
                  </div>
                  <div style={{marginBottom:10}}><div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:".05em",marginBottom:6}}>Riesgos</div>
                    {sugerenciaAI.riesgos?.map((r,i)=><div key={i} style={{display:"flex",gap:7,marginBottom:5,alignItems:"flex-start"}}><span style={{width:6,height:6,borderRadius:"50%",background:C.mid,marginTop:5,flexShrink:0}}/><span style={{fontSize:12,color:C.dark,lineHeight:1.5}}>{r}</span></div>)}
                  </div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:C.bg,border:`1px solid ${C.border}`,borderRadius:7,padding:"8px 12px"}}><span style={{fontSize:11,color:C.muted}}>Tiempo estimado</span><span style={{fontSize:12,fontWeight:600,color:C.primary}}>{sugerenciaAI.tiempo_estimado}</span></div>
                  <button style={{...btnG,width:"100%",marginTop:10,fontSize:11}} onClick={()=>pedirSugerencia(casoActivo)}>Regenerar sugerencia</button>
                </>}
                {sugerenciaAI?.error && <div style={{fontSize:12,color:C.muted,textAlign:"center",padding:"8px 0"}}>No se pudo obtener. <span style={{color:C.mid,cursor:"pointer",fontWeight:600}} onClick={()=>pedirSugerencia(casoActivo)}>Reintentar</span></div>}
              </div>}
            </div>

            {/* Panel chat */}
            <div style={{flex:1,display:"flex",flexDirection:"column",background:C.white,overflow:"hidden"}}>
              <div style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
                <div style={{fontSize:13,fontWeight:700,color:C.dark}}>Canal de comunicación</div>
                <div style={{fontSize:11,color:C.muted,marginTop:1,display:"flex",alignItems:"center",gap:5}}><span style={{width:6,height:6,borderRadius:"50%",background:C.accent}}/>Cifrado · el denunciante responde con su código</div>
              </div>
              <div style={{flex:1,overflowY:"auto",padding:"16px 18px",display:"flex",flexDirection:"column",gap:12,background:C.bg}}>
                {casoActivo.mensajes.map((m,i)=>(
                  m.tipo==="nota"
                    ? <div key={i} style={{background:C.white,border:`1px solid ${C.border}`,borderLeft:`3px solid ${C.accent}`,borderRadius:8,padding:"10px 12px",fontSize:12,color:C.mid,lineHeight:1.5}}>
                        <div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>Nota interna · solo RRHH</div>{m.texto}
                      </div>
                    : <div key={i} style={{display:"flex",flexDirection:"column",maxWidth:"82%",alignSelf:m.tipo==="rrhh"?"flex-end":"flex-start",alignItems:m.tipo==="rrhh"?"flex-end":"flex-start"}}>
                        <div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>{m.tipo==="sistema"?"Sistema":m.tipo==="rrhh"?"RRHH":"Denunciante anónimo"}</div>
                        <div style={{padding:"10px 13px",borderRadius:10,fontSize:13,lineHeight:1.6,background:m.tipo==="rrhh"?C.primary:C.white,color:m.tipo==="rrhh"?C.light:C.dark,border:m.tipo==="rrhh"?"none":`1px solid ${C.border}`}}>{m.texto}</div>
                        <div style={{fontSize:10,color:C.muted,marginTop:3}}>{m.fecha}</div>
                      </div>
                ))}
              </div>
              <div style={{padding:"12px 18px",borderTop:`1px solid ${C.border}`,background:C.white,flexShrink:0}}>
                <div style={{display:"flex",gap:2,marginBottom:10}}>
                  {[["responder","Responder al denunciante"],["nota","Nota interna"]].map(([k,l])=>(
                    <button key={k} style={{fontSize:12,fontWeight:600,padding:"5px 12px",borderRadius:6,cursor:"pointer",color:tabChat===k?C.primary:C.muted,background:tabChat===k?"#eef1fb":"transparent",border:"none",fontFamily:F}} onClick={()=>setTabChat(k)}>{l}</button>
                  ))}
                </div>
                <div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
                  <textarea style={{...inp,resize:"none",flex:1}} rows={2} placeholder={tabChat==="responder"?"Escribir respuesta...":"Escribir nota interna..."} value={nuevoMsg} onChange={e=>setNuevoMsg(e.target.value)}/>
                  <button style={btnP} onClick={()=>enviarMensaje(casoActivo.id)}>Enviar</button>
                </div>
              </div>
            </div>
          </div>
        </>}

        {/* VISTA: AI ANALYTICS */}
        {vista==="analytics" && <>
          <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"14px 24px",display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexShrink:0}}>
            <div>
              <div style={{fontSize:20,fontWeight:700,color:C.dark,letterSpacing:"-.02em"}}>AI Analytics</div>
              <div style={{fontSize:12,color:C.muted,marginTop:2}}>Análisis basado en {casos.length} casos</div>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{fontSize:11,color:C.muted,display:"flex",alignItems:"center",gap:5}}><span style={{width:6,height:6,borderRadius:"50%",background:C.accent}}/>Claude</span>
              <button style={btnG} onClick={()=>setVista("casos")}>← Volver</button>
              <button style={btnP}>Exportar informe</button>
            </div>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"20px 24px",display:"flex",flexDirection:"column",gap:16}}>
            {loadingAI && <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:10,padding:"40px 24px",textAlign:"center",color:C.muted,fontSize:13}}>Analizando {casos.length} casos con AI...</div>}
            {!loadingAI&&analyticsData&&<>
              <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:10,padding:16}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12}}><span style={{width:7,height:7,borderRadius:"50%",background:C.accent}}/><div style={{fontSize:11,fontWeight:700,color:C.mid,textTransform:"uppercase",letterSpacing:".06em"}}>Consultá los datos en lenguaje natural</div></div>
                <div style={{display:"flex",gap:8,marginBottom:10}}>
                  <input type="text" placeholder='Ej: ¿Cuántos casos de acoso hay en Comercial?' value={consulta} onChange={e=>setConsulta(e.target.value)} onKeyDown={e=>e.key==="Enter"&&consultarCasos(consulta)} style={{...inp,flex:1}}/>
                  <button style={{...btnP,opacity:consulta.trim()&&!loadingConsulta?1:0.5}} onClick={()=>consultarCasos(consulta)} disabled={!consulta.trim()||loadingConsulta}>{loadingConsulta?"...":"Consultar"}</button>
                </div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:respuesta||loadingConsulta?12:0}}>
                  {SUGERENCIAS.map((q,i)=><button key={i} style={{fontSize:11,padding:"4px 10px",borderRadius:99,border:`1px solid ${C.border}`,background:C.bg,color:C.muted,cursor:"pointer",fontFamily:F}} onClick={()=>{setConsulta(q);consultarCasos(q)}}>{q}</button>)}
                </div>
                {loadingConsulta && <div style={{fontSize:12,color:C.muted,padding:"10px 0"}}>Consultando datos...</div>}
                {respuesta&&!respuesta.error && <div style={{background:"#eef1fb",border:`1px solid ${C.light}`,borderRadius:8,padding:"12px 14px"}}>
                  <div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:".05em",marginBottom:6}}>"{respuesta.preg}"</div>
                  <div style={{fontSize:13,color:C.dark,lineHeight:1.7,whiteSpace:"pre-line"}}>{respuesta.texto}</div>
                  <button style={{fontSize:11,color:C.mid,background:"transparent",border:"none",cursor:"pointer",marginTop:8,fontFamily:F,fontWeight:600,padding:0}} onClick={()=>setRespuesta(null)}>Limpiar</button>
                </div>}
              </div>
              <div style={{background:C.white,border:`1px solid ${C.border}`,borderLeft:`4px solid ${C.primary}`,borderRadius:10,padding:"16px 18px"}}>
                <div style={{fontSize:10,fontWeight:700,color:C.accent,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8,display:"flex",alignItems:"center",gap:6}}><span style={{width:6,height:6,borderRadius:"50%",background:C.accent}}/>Resumen ejecutivo generado por AI</div>
                <div style={{fontSize:13,color:C.dark,lineHeight:1.7}}>{analyticsData.resumen}</div>
                <div style={{fontSize:11,color:C.muted,marginTop:8}}>Análisis no reemplaza criterio profesional</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:10}}>
                {[["Casos analizados",casos.length,"Últimos 30 días",null],["Tiempo prom.","11d","Recomendado: 7d",C.mid],["Más frecuente","Acoso","3 de 8 casos",null],["Tendencia","↑ Creciente","Este mes",C.mid]].map(([l,v,sub,col])=>(
                  <div key={l} style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 16px"}}>
                    <div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:".05em",marginBottom:8}}>{l}</div>
                    <div style={{fontSize:typeof v==="string"&&v.length>4?18:26,fontWeight:700,color:col||C.dark}}>{v}</div>
                    <div style={{fontSize:11,color:col||C.muted,marginTop:4}}>{sub}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:10,padding:16}}>
                  <div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:".06em",marginBottom:14}}>Por categoría</div>
                  {analyticsData.porCat.map(({cat,n})=>(
                    <div key={cat} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                      <div style={{fontSize:12,color:C.dark,width:110,flexShrink:0}}>{cat}</div>
                      <div style={{flex:1,height:6,background:C.bg,borderRadius:99,overflow:"hidden"}}><div style={{height:"100%",borderRadius:99,background:C.mid,width:`${n/3*100}%`}}/></div>
                      <div style={{fontSize:12,fontWeight:600,color:C.primary,width:20,textAlign:"right"}}>{n}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:10,padding:16}}>
                  <div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:".06em",marginBottom:14}}>Riesgo por departamento</div>
                  {analyticsData.porDepto.map(({d,n,r})=>(
                    <div key={d} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
                      <span style={{fontSize:13,color:C.dark}}>{d}</span>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <span style={{fontSize:12,color:C.muted}}>{n} casos</span>
                        <span style={{fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:99,background:r==="alto"?"#eef1fb":r==="medio"?C.light:C.bg,color:r==="bajo"?C.muted:C.primary}}>{r.toUpperCase()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:10,padding:16}}>
                  <div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:".06em",marginBottom:14}}>Patrones detectados</div>
                  {analyticsData.patrones.map((p,i)=>(
                    <div key={i} style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px",marginBottom:10}}>
                      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,marginBottom:6}}>
                        <div style={{fontSize:13,fontWeight:600,color:C.dark}}>{p.titulo}</div>
                        <span style={{fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:99,background:p.sev==="alta"?"#eef1fb":C.light,color:C.primary,whiteSpace:"nowrap"}}>{p.sev.toUpperCase()}</span>
                      </div>
                      <div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>{p.desc}</div>
                      <div style={{display:"flex",gap:5,marginTop:8}}>{p.deptos.map(d=><span key={d} style={{fontSize:10,color:C.mid,background:"#eef1fb",border:`1px solid ${C.light}`,padding:"2px 8px",borderRadius:99,fontWeight:600}}>{d}</span>)}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:10,padding:16}}>
                    <div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:".06em",marginBottom:14}}>Alertas accionables</div>
                    {analyticsData.alertas.map((a,i)=>(
                      <div key={i} style={{background:C.white,border:`1px solid ${C.border}`,borderLeft:`3px solid ${C.accent}`,borderRadius:8,padding:"11px 14px",marginBottom:8}}>
                        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{width:7,height:7,borderRadius:"50%",background:C.primary}}/><span style={{fontSize:11,fontWeight:700,color:C.primary}}>{a.tipo}</span></div>
                        <div style={{fontSize:12,color:C.dark,lineHeight:1.5}}>{a.msg}</div>
                        <div style={{fontSize:11,color:C.mid,marginTop:5,fontWeight:600,cursor:"pointer"}} onClick={()=>{setVista("casos");setFiltro("vencidos")}}>{a.accion} →</div>
                      </div>
                    ))}
                  </div>
                  <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:10,padding:16}}>
                    <div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:".06em",marginBottom:14}}>Recomendaciones</div>
                    {["Activar protocolo de investigación formal en Comercial con instructor externo.","Revisar los 2 casos de Finanzas de forma coordinada antes de cerrarlos por separado.","Atender los casos vencidos de SLA esta semana para evitar exposición legal."].map((r,i)=>(
                      <div key={i} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:`1px solid ${C.border}`,alignItems:"flex-start"}}>
                        <div style={{width:20,height:20,borderRadius:"50%",background:"#eef1fb",color:C.primary,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div>
                        <div style={{fontSize:12,color:C.dark,lineHeight:1.6}}>{r}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>}
          </div>
        </>}
      </div>
    </div>
  )
}
