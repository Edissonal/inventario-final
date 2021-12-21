export interface HistoMantenimientos {

  costo_man?:        number;
  id_man?:           string;
  id_con?:           string;
  id_ma?:            string;
  nombre_ma?:        string;
  id_equi?:          string;
  nombre_equi?:      string;
  id_pro?:           string;
  nombre_pro?:       string;
  id_ciu?:           string;
  nombre_ciu?:       string;
  id_sede?:          string;
  nombre_sede?:      string;
  id_ubi?:           string;
  nombre_ubi?:       string;
  estado_man?:       string;
  periodicidad_man?: string;
  fecha_pro_man?:    string;
  fecha_man?:        string;

  estado_hman?:string,
  fecha_hman?: string,
  id_usu?: string
  
  status?: string;
  code?: number;
  message?: string;
}


