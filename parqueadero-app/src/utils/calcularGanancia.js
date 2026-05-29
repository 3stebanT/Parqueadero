export function agruparGananciasPorMes(historial) {
  const meses = {};

  historial.forEach(v => {
    if (!v.hora_salida) return;

    const fecha = new Date(v.hora_salida);

    const mes = fecha.getMonth(); // 0-11
    const año = fecha.getFullYear();

    const key = `${año}-${mes}`;

    if (!meses[key]) {
      meses[key] = {
        mes,
        año,
        total: 0
      };
    }

    meses[key].total += v.valor || 0;
  });

  return Object.values(meses).sort((a, b) => {
    return new Date(a.año, a.mes) - new Date(b.año, b.mes);
  });
}