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
    .then((resp)=> resp.text())
    .then((text)=>{
      return new Promise((resolve,reject)=>{
        const jsonText = text.match(/billboard = (\[.*\]);/)[1]
        try{
          resolve(JSON.parse(jsonText));
        }
        catch(err){
          const treated = jsonText.replace(/([^\r\n\{:\[,])"([^:\],])/gm,'$1\\"$2');
          try{
            resolve(JSON.parse(treated));
          }
          catch(e){
            reject(err);
          }
        }
      });
    })
    .then((json)=>{
      const rows = json.filter((row)=>{
        return !!row.code && row.code.length === 5;
      });
      const data = rows.map((row)=>{
        return {
          key: Math.random().toString(36).slice(-5),
          nombre: parseNombre(row.reason),
          docente: row.person,
          horario: row.init_hour +' a '+ row.end_hour,
          lugar: parseLugar(row.room),
          estado: row.is_cancel ? 'Cancelada' : 'Normal',
          catedra: parseCatedra(row.code)
        }
      });
      resolve(data);
    })
    .catch((err)=>{
      reject(err);
    })
  })
};

const refs = {
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

const parseLugar = (input)=>{
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

const parseCatedra = (input)=>{
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

const parseNombre = (input)=>{
  const match = input.match(/\[(.*)\] (.*)/);
  const nombre = match ? match[2] : input;
  return toNormalCase(nombre);
}

const toNormalCase = (string)=>{
  return string.split(' ').map(word => {
    if(/^(I{1,3}|2D|3D)$/.test(word)) return word
    if(word.length < 4 && word != 'WEB') return word.toLowerCase()
    const arr = word.toLowerCase().split('')
    arr[0] = arr[0].toUpperCase()
    return arr.join('')
  }).join(' ')
}