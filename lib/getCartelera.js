/*
  When resolved an Array of objects will be passed

  Example object:
  {
    key: 54544,
    nombre: 'Lógica de la programación',
    docente: 'Noto, Federico',
    horario: '9:00 - 11:00',
    lugar: {
      corto: '1-12', // ' - '
      largo: 'Edificio 1 piso 2 aula 112' // 'Sin asignar'
    },
    estado: 'Normal',
    catedra: {
      corto: 'DWN5A',
      largo: 'Diseño Web turno noche semestre 5 comisión A',
      carrera: 'DW',
      turno: 'T',
      semestre: '5',
      comision: 'A'
    }
  }

*/

import { CARTELERA_URL } from './constants';

export default ()=>{
  return new Promise((resolve,reject)=>{
    fetch(CARTELERA_URL)
    .then((resp)=> {
      return resp.json()
    })
    .then((json)=>{
      let rows = json.rows.filter((row)=>{
        return row.cell[1].length === 5;
      });
      let data = rows.map((singleRow)=>{
        row = singleRow.cell;
        return {
          key: singleRow.id,
          nombre: row[2],
          docente: row[8],
          horario: row[5].trim() +' a'+ row[6],
          lugar: parseLugar(row[9]),
          estado: row[7] === 'CANCELADA' ? 'Cancelada' : 'Normal',
          catedra: parseCatedra(row[1])
        }
      });
      resolve(data);
    })
    .catch((err)=>{
      reject(err);
    })
  })
};

let refs = {
  carreras: {
    DM: 'Diseño Multimedial',
    DG: 'Diseño Gráfico',
    VJ: 'Programación de Videojuegos',
    CA: 'Cine de Animación',
    DW: 'Diseño y Desarrollo Web',
    AC: 'Analista de Sistemas'
  },
  turnos: {
    M: 'Turno Mañana',
    T: 'Turno Tarde',
    N: 'Turno Noche',
  }
}

let parseLugar = (input)=>{
  let lugar = {};
  if(input.length === 4){
    lugar.corto = input;
    let temp = input.split('');
    lugar.largo = 'Edificio '+ temp[0] +' piso '+ temp[2] +' aula '+ temp[0] + temp[2] + temp[3];
  }
  else{
    lugar.corto = '-';
    lugar.largo = 'Sin asignar';
  }
  return lugar;
}

let parseCatedra = (input)=>{
  let partes = input.split('');
  partes[0] = partes[0] + partes.splice(1,1);
  return {
    corto: input,
    largo: refs.carreras[partes[0]] +', '+ refs.turnos[partes[1]] +', Semestre '+ partes[2] +', Comisión '+ partes[3],
    carrera: partes[0],
    turno: partes[1],
    semestre: partes[2],
    comision: partes[3]
  };
}