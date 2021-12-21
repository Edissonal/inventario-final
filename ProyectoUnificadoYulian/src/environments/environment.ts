// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  prourl: 'http://localhost/inventario/provedor.php/provedor',
  ciurl: 'http://localhost/inventario/ciudad.php/ciudad',
  equiurl: 'http://localhost/inventario/equipo.php/equipo',
  marca: 'http://localhost/inventario/marca.php/marca',
  sedeurl: 'http://localhost/inventario/sede.php/sede',
  ubiurl: 'http://localhost/inventario/ubicacion.php/ubicacion',
  mante: 'http://localhost/inventario/mantenimientos.php',
  potsmanh: 'http://localhost/inventario/hismantenimiento.php',
  consulta: 'http://localhost/inventario/consultas.php',
  cargaurl: 'http://localhost/inventario/upload-consultas.php/provedor',
  usurl : 'http://localhost/inventario/usuarios.php',
  potsconsh : "http://localhost/inventario/consultas.php/"
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
import { Marcas } from '../app/interfaces/marcas.interfaces';
