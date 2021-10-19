export interface ITendero {
    codigo: string;
    nombre: string;
    apellido: string;
    telefono: string;
    nombretienda: string;
    cod_categoria_tienda: string;
    cod_usuarios: string;
    nitTienda: string;
    doctendero: string;
    cod_contrato: string;
    acepta_contrato: string;
    cov_norte: string;
    cov_sur: string;
    cov_este: string;
    cov_oeste: string;
    userId: string;
    lunes_viernes_apertura: string;
    lunes_viernes_cierre: string;
    sabados_apertura: string;
    sabados_cierre: string;
    festivos_apertura: string;
    festivos_cierre: string;
    min_pedido: string;
    cobertura: string;
}

export interface Messages {
  id: string;
  ref_path: string;
  toUser: number;
  view: boolean;
  delivered: boolean;
  msg: string;
  createdAt: CreatedAt;
  fromUser: number;
}

interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}