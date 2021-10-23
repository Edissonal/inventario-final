export interface PedidoDetalle {
    codigo: string;
    cod_cliente: string;
    cod_tendero: string;
    estatus: string;
    pagado: string;
    fecha: string;
    totalfactura: string;
    propina: string;
    tiempoenvio: string;
    comision: string;
    cod_calificacion?: any;
    useridcliente: string;
    tipo_pago: string;
    envio: string;
}