# US-13 - Pruebas funcionales e integración

## Pruebas realizadas

| ID | Prueba | Resultado esperado | Resultado |
|---|---|---|---|
| TC-01 | Registrar placa vacía | Mostrar mensaje de validación | Aprobada |
| TC-02 | Registrar placa con menos de 6 caracteres | Rechazar la placa | Aprobada |
| TC-03 | Ingresar caracteres no permitidos | Eliminar caracteres no válidos | Aprobada |
| TC-04 | Construcción del proyecto | Generar build de producción | Aprobada |
| TC-05 | Análisis estático | Identificar errores existentes | Ejecutada |

## Evidencia

La validación funcional se verificó directamente desde la interfaz del sistema.

La construcción del proyecto se verificó mediante `npm run build`, obteniendo una compilación exitosa.

`npm run lint` fue ejecutado como parte de la revisión técnica. Se identificaron errores existentes en diferentes componentes del proyecto, los cuales fueron registrados como hallazgos técnicos.