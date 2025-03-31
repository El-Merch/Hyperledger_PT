INSERT en tabla pedidos

4,EcoMarket,CAJAS HIDROPONICAS,Documentos Recibidos,2025-03-31 13:53:43.000000,uploads\1743461914517.pdf,uploads\1743461914517.xml


Insert en tabla timeline
13,4,Entrada,2024-03-02 11:35:00.000000,completed
14,4,Verificación,2024-03-02 12:00:00.000000,completed
15,4,Verificación Aceptada,2024-03-02 13:00:00.000000,completed
16,4,Esperando Documentos,2024-03-02 13:15:00.000000,in-progress

Comandos para actualizar el id incremental de la tabla de timeline

SELECT pg_get_serial_sequence('timeline', 'id');

SELECT last_value FROM timeline_id_seq;

SELECT setval('timeline_id_seq', (SELECT MAX(id) FROM timeline));
