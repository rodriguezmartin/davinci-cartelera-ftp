
export const CARTELERA_URL = 'https://dvcarreras.davinci.edu.ar/billboard_kiosk.html';
export const FTP_IP = '200.68.69.58';
export const FTP_PORT = 21;
export const STORAGE = '/storage/emulated/0/DaVinci FTP/';
export const COLORS = {
  DM: '#14a24a',
  DG: '#8240a1',
  VJ: '#cba410',
  CA: '#2fb0a5',
  DW: '#BD403A',
  AC: '#503da4'
};
export const FILTERS = [
  {
    id: 'carrera',
    name: 'Carrera',
    options: [
      {value: 'Todo', name: 'Todas las carreras'},
      {value: 'DM', name: 'Diseño Multimedial', color: '#14a24a'},
      {value: 'DG', name: 'Diseño Gráfico', color: '#8240a1'},
      {value: 'VJ', name: 'Programación de Videojuegos', color: '#cba410'},
      {value: 'CA', name: 'Cine de Animación', color: '#2fb0a5'},
      {value: 'DW', name: 'Diseño y Desarrollo Web', color: '#BD403A'},
      {value: 'AC', name: 'Analista de Sistemas', color: '#503da4'}
    ]
  },
  {
    id: 'turno',
    name: 'Turno',
    options: [
      {value: 'Todo', name: 'Todos los turnos'},
      {value: 'M', name: 'Turno Mañana'},
      {value: 'T', name: 'Turno Tarde'},
      {value: 'N', name: 'Turno Noche'}
    ]
  },
  {
    id: 'semestre',
    name: 'Semestre',
    options: [
      {value: 'Todo', name: 'Todos los semestres'},
      {value: '1', name: 'Primer Semestre'},
      {value: '2', name: 'Segundo Semestre'},
      {value: '3', name: 'Tercer Semestre'},
      {value: '4', name: 'Cuarto Semestre'},
      {value: '5', name: 'Quinto Semestre'},
      {value: '6', name: 'Sexto Semestre'}
    ]
  },
  {
    id: 'comision',
    name: 'Comisión',
    options: [
      {value: 'Todo', name: 'Todas las comisiones'},
      {value: 'A', name: 'Comisión A'},
      {value: 'B', name: 'Comisión B'},
      {value: 'C', name: 'Comisión C'},
      {value: 'D', name: 'Comisión D'}
    ]
  }
];