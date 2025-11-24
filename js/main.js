
const MAX_OLAS = 5; // 
const SALUDO = "Bienvenido al Simulador Básico";


let nombreUsuario = "";
let edadUsuario = 0;
let agentes = []; 
let resultados = []; 


function solicitarDatos() {
  console.log("%c" + SALUDO, "font-weight:bold; font-size:14px;");
  nombreUsuario = prompt("Ingrese su nombre:", "Jugador");
  if (!nombreUsuario) nombreUsuario = "Jugador Anónimo";
  const edadTxt = prompt("Ingrese su edad (número):", "18");
  edadUsuario = Number(edadTxt) || 18;

  const usarValoresPorDefecto = confirm("¿Desea usar la configuración por defecto de agentes? (OK = sí, Cancel = no)");

  if (usarValoresPorDefecto) {
    
    agentes = generarAgentesPorDefecto();
  } else {
    
    const cantTxt = prompt("¿Cuántos agentes desea crear? (ej: 3)", "3");
    const cantidad = Math.max(1, Number(cantTxt) || 3);
    agentes = [];
    for (let i = 1; i <= cantidad; i++) {
      const energia = Math.floor(Math.random() * 51) + 50; // 50 a 100
      agentes.push({ id: i, energia: energia, estado: "activo" });
    }
  }

  console.log("Datos solicitados:", { nombreUsuario, edadUsuario, agentes });
  alert(`Hola ${nombreUsuario}! Se crearon ${agentes.length} agentes. Revisa la consola para seguir la simulación.`);
}


function generarAgentesPorDefecto() {
  const defaults = [];
  const energias = [100, 85, 70, 60];
  for (let i = 0; i < energias.length; i++) {
    defaults.push({ id: i + 1, energia: energias[i], estado: "activo" });
  }
  return defaults;
}


function procesarSimulacion(olas) {
  resultados = []; // reset
  const olasAProcesar = Math.min(olas, MAX_OLAS);
  console.log(`Iniciando simulación por ${olasAProcesar} olas (máx ${MAX_OLAS}).`);

  for (let ola = 1; ola <= olasAProcesar; ola++) {
    console.log(`--- Ola ${ola} ---`);
    
    for (let i = 0; i < agentes.length; i++) {
      const agente = agentes[i];
      
      const impacto = generarEventoAleatorio();
      agente.energia -= impacto;
      if (agente.energia <= 0) {
        agente.energia = 0;
        agente.estado = "derribado";
      }
      
      console.log("Agente ID: " + agente.id + " | Energía: " + agente.energia + " | Estado: " + agente.estado);
    }

    
    if (ola % 2 === 0) {
      console.log("Evento especial: recuperación ligera para agentes activos.");
      for (let j = 0; j < agentes.length; j++) {
        if (agentes[j].estado === "activo") {
          agentes[j].energia += 5; 
        }
      }
    }

    
    const resumen = {
      ola: ola,
      activos: agentes.filter(a => a.estado === "activo").length,
      promedioEnergia: calcularPromedioEnergia()
    };
    resultados.push(resumen);
    console.log("Resumen de la ola:", resumen);
  }

  return resultados;
}


function generarEventoAleatorio() {
 
  const r = Math.random();
  if (r < 0.2) return 0;            // 20% sin impacto
  if (r < 0.6) return Math.floor(Math.random() * 11) + 5; // 5-15
  return Math.floor(Math.random() * 16) + 10; // 10-25
}


function calcularPromedioEnergia() {
  if (agentes.length === 0) return 0;
  let suma = 0;
  for (let i = 0; i < agentes.length; i++) {
    suma += agentes[i].energia;
  }
  return Math.round((suma / agentes.length) * 10) / 10;
}


function mostrarResultados(res) {
  console.log("=== RESULTADOS FINALES ===");
  console.log("Simulación ejecutada por:", nombreUsuario, "(" + edadUsuario + " años)");
  console.table(agentes);
  console.log("Resumen por ola:");
  console.table(res);

  
  const mensaje = "Simulación finalizada para " + nombreUsuario + ".\n" +
                  "Agentes totales: " + agentes.length + "\n" +
                  "Agentes activos: " + agentes.filter(a => a.estado === "activo").length + "\n" +
                  "Promedio energía: " + calcularPromedioEnergia();
  alert(mensaje);
}


(function main() {
  solicitarDatos();

  
  const olasTxt = prompt("¿Cuántas olas deseas simular? (Max " + MAX_OLAS + ")", "3");
  const olasNum = Math.max(1, Math.min(MAX_OLAS, Number(olasTxt) || 3));

  
  const resumen = procesarSimulacion(olasNum);

  
  mostrarResultados(resumen);

 
  console.log("Simulación completada. Archivo: Entregable1+Villegas");
})();
