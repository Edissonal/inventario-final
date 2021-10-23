import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { AuthguardService } from "./authguard.service";
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs';
import { PushService } from 'src/app/services/push.service';

@Injectable({
    providedIn: "root",
})

export class ApiService {
    datoIDT;
    accessToken;
    headers;
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/x-www-form-urlencoded",
        }),
    };

    version_app = "1.11.0";

    api = 'https://backend.vecino.com.co/apicliente/';
    api2 = 'https://backend.vecino.com.co/apitendero/';
    // api = "http://localhost/vecino/apicliente/";
    // api2 = "http://localhost/vecino/apitendero/";


    constructor(private http: HttpClient,
        private apiSesion: AuthguardService,
        public pushService: PushService,
        private cache: CacheService) {
        cache.setDefaultTTL(60 * 60);
        cache.setOfflineInvalidate(false);
        this.init();
    }

    async init() {
        this.headers = new Headers({ Authorization: "Bearer " + this.accessToken });
    }

    //--------------------------------------------------------------------------------------//
    //                                     METODOS GET                                      //
    //--------------------------------------------------------------------------------------//

    // Obtener busqueda de productos
    public obtenerBusqueda(articulo): Observable<any> {
        let url = this.api + "getbusquedaarticulos/" + articulo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener todas las categorias de tiendas ------------------------------------------
    public obtenerCateTiendas(): Observable<any> {
        let url = this.api + "getcategoriastiendas";
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerCalificaciones(): Observable<any> {
        let url = this.api + "getcalificaciones/";
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener todas las Imagenes -------------------------------------------------------
    public obtenerImagenes(): Observable<any> {
        let url = this.api + "getimagenes";
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener todas las categorias de articulos, segun el codigo del tendero -----------
    public obtenerCategorias(codigo): Observable<any> {
        let url = this.api + "getcategoriasarticulos/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener todas las promociones, segun el codigo del tendero -----------
    public obtenerPromociones(): Observable<any> {
        let url = this.api + "getpromociones/";
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener informacion de la promocion, segun el codigo -----------
    public obtenerPromocion(codigo): Observable<any> {
        let url = this.api + "getpromocion/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener toda la informacion del tendero, segun su codigo -------------------------
    public obtenerInfoCliente(codigo): Observable<any> {
        let url = this.api + "getcliente/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener la direccion del tendero  --------------------
    public obtenerDirecciones(): Observable<any> {
        let url = this.api + "getdirecciones";
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerDireccionesSitios(): Observable<any> {
        let url = this.api + "getdireccionessitios";
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener la direccion del cliente, segun el codigo del cliente --------------------
    public obtenerDireccion(codigo): Observable<any> {
        let url = this.api + "getdireccion/" + codigo;
        // let cacheKey = url;
        let request = this.http.get(url);
        // return this.cache.loadFromObservable(cacheKey, request);
        return request;
    }

    // ---- Obtener informacion de las comisiones, segun el codigo de tendero ----------------
    public obtenerInfoComisiones(codigo): Observable<any> {
        let url = this.api + "getcomisiones/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener informacion de la comision seleccionada, segun su codigo -----------------
    public obtenerComision(codigo): Observable<any> {
        let url = this.api + "getcomision/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerArticulos(): Observable<any> {
        let url = this.api + "getarticulos";
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerArticulosTienda(codigo, codcategoria): Observable<any> {
        let url = this.api + "getarticulostienda2/" + codigo + '/' + codcategoria;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener todas las categorias de articulos, segun el codigo del tendero -----------
    public obtenerCategoriasArt(): Observable<any> {
        let url = this.api + "getcategoriasarticulos/";
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener todas los colores -----------
    public obtenerColores(): Observable<any> {
        let url = this.api + "getcolores";
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener todas las tallas -----------
    public obtenerTallas(): Observable<any> {
        let url = this.api + "gettallas";
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener todas las ciudades -----------
    public obtenerCiudades(departamento): Observable<any> {
        let url = this.api + "getciudades/" + departamento;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener todos los tenderos -------------------------------------------------------
    public obtenerTenderos(codigo): Observable<any> {
        let url = this.api + "gettenderos/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener info de uno de  los tenderos -------------------------------------------------------
    public obtenerInfoTenderos(codigo): Observable<any> {
        let url = this.api + "getInfotenderos/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }


    // ---- Obtener todos los tenderos -------------------------------------------------------
    public obtenerTenderosUserId(codigo): Observable<any> {
        let url = this.api + "gettenderosuserid/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener todas las variantes -------------------------------------------------------
    public obtenerVariantes(codigo): Observable<any> {
        let url = this.api + "getvariantes/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener todas las variantes -------------------------------------------------------
    public obtenerTodasTiendas(): Observable<any> {
        let url = this.api + "getalltenderos/";
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener todas las calificaciones -------------------------------------------------------
    public obtenerTodasCalificaciones(): Observable<any> {
        let url = this.api + "getallcalificaciones/";
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener todas las ventas -------------------------------------------------------
    public obtenerTodasVentas(codigo): Observable<any> {
        this.cache.clearAll();
        let url = this.api + "getallventas/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerTodasVentasCliente(codigo): Observable<any> {
        let url = this.api + "getallventascliente/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerPedido(codigo): Observable<any> {
        let url = this.api + "getpedido/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener todas las ventas -------------------------------------------------------
    public obtenerTodasVentasLineas(): Observable<any> {
        let url = this.api + "getalldetallesventas/";
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener detalle de la venta -------------------------------------------------------
    public obtenerDetalleVenta(codigo) {
        this.cache.clearAll();
        let url = this.api + "getdetalleventa/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerPromocionesTendero(codigo): Observable<any> {
        let url = this.api + "getpromocionestendero/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerInfoTendero(codigo): Observable<any> {
        let url = this.api + 'gettendero/' + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenertTendasCercanas(): Observable<any> {
        let url = this.api + 'gettiendascercanas/';
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenertTendasCercanas_sitios(): Observable<any> {
        let url = this.api + 'gettiendascercanas/';
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerProductosCercanas(): Observable<any> {
        let url = this.api + 'getarticuloslimit/';
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener informacion del usuairo segun el codigo de tendero -----------
    public conociendoRegistro(email): Observable<any> {
        let url = this.api2 + "conociendoregistro/" + email;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    //--------------------------------------------------------------------------------------//
    //                            METODOS DE SESION                                      //
    //--------------------------------------------------------------------------------------//

    // ---- Login con email y usuario del tendero --------------------------------------------
    postLogin(email, password, version) {
        this.cache.clearAll();
        let e = email;
        let p = password;
        const path = this.api + "login/";
        let datos = `email=${e}&password=${p}&version=${version}`;
        return this.http.post(path, datos, this.httpOptions);
    }

    // ---- Registro para los clientes con nombre, apellido, telefono, email, rut, password, confirmpassword ----
    postRegistro(
        nombre, apellido, telefono, rut, email, password, direccion, pais, ciudad, detalles, latitud, longitud, version, tipo_inicio) {
        this.cache.clearAll();
        let _nombre = nombre;
        let _apellido = apellido;
        let _telefono = telefono;
        let _rut = rut;
        // let _userIdcliente = userid;
        let _email = email;
        let _password = password;
        // let _imagen = imagen
        let _direccion = direccion;
        let _ciudad = ciudad;
        let _pais = pais;
        let _detalles = detalles;
        let _latitud = latitud;
        let _longitud = longitud;

        const path = this.api + "registroapi/";
        let datos = `nombre=${nombre}&apellido=${apellido}&telefono=${telefono}&email=${email}&rut=${_rut}&password=${password}&direccion=${_direccion}&pais=${_pais}&ciudad=${_ciudad}&detalles=${_detalles}&latitud=${_latitud}&longitud=${_longitud}&version=${version}&tipo_inicio=${tipo_inicio}`;
        console.log("datos de registro: " + datos);
        return this.http.post(path, datos, this.httpOptions);
    }

    postRestablecer(email) {
        const path = this.api + "restablecer";
        let datos = `email=${email}`;
        return this.http.post(path, datos, this.httpOptions);
    }

    // ---- Cerrar sesion del tendero --------------------------------------------------------
    postclose(id) {
        this.cache.clearAll();
        let datoID = `${id}`;
        const path = this.api + "cerrarsesion/";
        this.apiSesion.eliminarSesion();
        return this.http.post(path, datoID, this.httpOptions);
    }

    //--------------------------------------------------------------------------------------//
    //                            METODOS DE POST                                         //
    //--------------------------------------------------------------------------------------//

    // ---- Actualizar perfil --------------------------------------------------------------
    postPerfil(
        nombretienda,
        direccion,
        telefono,
        fotoportada,
        fototienda,
        codtendero
    ) {
        this.cache.clearAll();
        const path = this.api + "updateperfil/";
        let datos = `nombretienda=${nombretienda}&direccion=${direccion}&telefono=${telefono}&fotoportada=${fotoportada}&fototienda=${fototienda}&cod_tendero=${codtendero}`;
        console.log(datos);
        return this.http.post(path, datos, this.httpOptions);
    }

    actualizarDireccion(codigo, pais, ciudad, direccion, mdetalles, latitud, longitud): Observable<any> {
        this.cache.clearAll();
        const path = this.api + "updatedireccion/";
        let datos = `codigo=${codigo}&direccion=${direccion}&pais=${pais}&ciudad=${ciudad}&detalles=${mdetalles}&latitud=${latitud}&longitud=${longitud}`;
        console.log(datos);
        return this.http.post(path, datos, this.httpOptions);
    }

    actualizarPedidoCalificacion(codigo, calificacion) {
        this.cache.clearAll();
        const path = this.api + "updatepedidocalificacion/";
        let datos = `codigo=${codigo}&calificacion=${calificacion}`;
        console.log(datos);
        return this.http.post(path, datos, this.httpOptions);
    }

    /** REVIEW - VERSION 1.0.1
     * Versionamiento para la App Clientes
     * Este archivo api se compone de los métodos funcionales para realizar POST, GET, UPDATE y DELETE
     * para la version 1.0.1
     * */

    public actualizarPedidoLaterTenMin(codigo, cliente, tendero): Observable<any> {
        let url = this.api + "cancelarpedidotenmins/" + codigo + "/" + cliente + "/" + tendero;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    /** REVIEW - VERSION 1.0.2
     * Versionamiento para la App Clientes
     * Este archivo api se compone de los métodos funcionales para realizar POST, GET, UPDATE y DELETE
     * para la version 1.0.2
     * */

    public obtenerTiposPago(codtendero): Observable<any> {
        let url = this.api + "gettiposdepago/" + codtendero;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerPasarelasPago(): Observable<any> {
        let url = this.api + "getpasarelaspago/";
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    /** REVIEW - VERSION 1.0.4
     * Versionamiento para la App Clientes
     * Este archivo api se compone de los métodos funcionales para realizar POST, GET, UPDATE y DELETE
     * para la version 1.0.4
    * */

    //--------------------------------------------------------------------------------------//
    //                     METODOS DE BUSQUEDA                                      //
    //--------------------------------------------------------------------------------------//
    public obtenerBusquedaArticulosTiendaUnicamente(busqueda, tendero): Observable<any> {
        let busca = busqueda.toString();
        busca.replace(" ","_");
        console.log(busca);
        
        let url = this.api + 'getbusquedaarticulostenderounicamente2/' + busqueda + "/" + tendero;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    /** REVIEW - VERSION 1.0.6
    * Versionamiento para la App Clientes
    * Este archivo api se compone de los métodos funcionales para realizar POST, GET, UPDATE y DELETE
    * para la version 1.0.6
   * */
    public obtenerVersionClientesBD() {
        let url = this.api + "obtenerversionclientes";
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener todas las categorias de tiendas ------------------------------------------
    public obtenernewCateTiendas(): Observable<any> {
        let url = this.api + "getcategoriasnewtiendas";
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener todas todas las promociones destacadas ------------------------------------------
    public obtenernewPromocionesDestacadas(): Observable<any> {
        let url = this.api + "getnewpromocionescercanas";
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener todas todas las productos destacados ------------------------------------------
    public obtenernewProductosDestacados(): Observable<any> {
        let url = this.api + "getnewproductoscercanos";
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener todas los sitios cercanos ------------------------------------------
    public obtenernewSitiosCercanos(): Observable<any> {
        let url = this.api + "getnewtiendascercanas";
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }


    /** REVIEW - VERSION 1.0.7
    * Versionamiento para la App Clientes
    * Este archivo api se compone de los métodos funcionales para realizar POST, GET, UPDATE y DELETE
    * para la version 1.0.7
   * */

    public obtenercategoriasTienda2(codigo): Observable<any> {
        let url = this.api + "getCategoriasTienda2/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerArticulosCategoria(codigo, codcategoria): Observable<any> {
        let url = this.api + "getarticuloscategoriacodigo2/" + codigo + '/' + codcategoria;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerArticulosSubCategoria(codigo, codcategoria): Observable<any> {
        this.cache.clearAll();
        let url = this.api + "getarticulossubcategoriacodigo2/" + codigo + '/' + codcategoria;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // ---- Obtener informacion sobre el articulo, mediante el codigo de articulo ------------
    public obtenerArticulo(codigo, tendero): Observable<any> {
        let url = this.api + "getarticulo/" + codigo + '/' + tendero;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenersubcategorias(codigo, codcategoria): Observable<any> {
        let url = this.api + "getsubcategorias/" + codigo + '/' + codcategoria;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerTodosPedidosCliente(codigo): Observable<any> {
        this.cache.clearAll();
        let url = this.api + "obtenerpedidosporcliente/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public conocerantesderestablecer(email) {
        this.cache.clearAll();
        const path = this.api + "conocerantesderestablecerpasswordexternocliente/";
        let datos = `email=${email}`;
        console.log(datos);
        return this.http.post(path, datos, this.httpOptions);
    }

    public restablecerPassword(email, password) {
        this.cache.clearAll();
        const path = this.api + "restablecerpasswordexternocliente/";
        let datos = `email=${email}&password=${password}`;
        console.log(datos);
        return this.http.post(path, datos, this.httpOptions);
    }

    /** REVIEW - VERSION 1.0.13
     * Versionamiento para la App Clientes
     * Este archivo api se compone de los métodos funcionales para realizar POST, GET, UPDATE y DELETE
     * para la version 1.0.13
    * */

    public sendPushTendero(codtendero: string, msg: string) {
        this.cache.clearAll();
        let path = this.api + 'enviarnotichataltendero';
        let data = `codtendero=${codtendero}&mensaje=${msg}`;
        return this.http.post(path, data, this.httpOptions);
    }

    /** REVIEW - VERSION 1.0.14
     * Versionamiento para la App Clientes
     * Este archivo api se compone de los métodos funcionales para realizar POST, GET, UPDATE y DELETE
     * para la version 1.0.14
    * */

    public obtenerMenusArticulo(codigo) {
        this.cache.clearAll();
        let url = this.api + "obtenermenusproducto/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerOpcionesMenusArticulo(codigo) {
        this.cache.clearAll();
        let url = this.api + "obteneropcionesmenusproducto/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerOpcionesMenusArticuloSinDia(codigo) {
        this.cache.clearAll();
        let url = this.api + "obteneropcionesmenusproductosindia/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerregistroopcionmenusArticulo(codigo) {
        this.cache.clearAll();
        let url = this.api + "obtenertipomenuproducto/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    postPedido(cliente, tendero, estatus, factura, propina, comision, userIdtendero) {
        let idcliente = this.pushService.userId;
        this.cache.clearAll();
        const path = this.api + "postpedido/";
        let datos = `cod_cliente=${cliente}&cod_tendero=${tendero}&estatus=${estatus}&totalfactura=${factura}&propina=${propina}&comision=${comision}&useridtendero=${userIdtendero}&useridcliente=${idcliente}`;
        // console.log(datos);
        return this.http.post(path, datos, this.httpOptions);
    }

    /** REVIEW - VERSION 1.0.14
  * Versionamiento para la App Clientes
  * Este archivo api se compone de los métodos funcionales para realizar POST, GET, UPDATE y DELETE
  * para la version 1.0.14
 * */

    public obtenermenuproducto(codigo): Observable<any> {
        let url = this.api + 'obtenerdetallesmenuproducto/' + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    /** REVIEW - VERSION 1.2.0
   * Versionamiento para la App Clientes
   * Este archivo api se compone de los métodos funcionales para realizar POST, GET, UPDATE y DELETE
   * para la version 1.2.0
  * */

    obtenerTiendasCercanas_Dashboard120(latitudcliente, longitudcliente): Observable<any> {
        let url = this.api + 'tiendascercanasdashboard120newhorarios/'+ latitudcliente + "/"+longitudcliente;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    obtenerTiendasCercanas_Tiendas120(latitudcliente, longitudcliente, codcatetienda): Observable<any> {
        let url = this.api + 'tiendascercanastiendas120newhorarios/' +  latitudcliente + "/" +longitudcliente+"/"+ codcatetienda;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    obtenerProductosCercanos_Dashboard(latitudcliente, longitudcliente): Observable<any> {
        let url = this.api + 'productoscercanos120/'+ latitudcliente+"/"+ longitudcliente;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    //--------------------------------------------------------------------------------------//
    //                     METODOS DE BUSQUEDA                                      //
    //--------------------------------------------------------------------------------------//
    public obtenerTiendaBusqueda(busqueda: any, latcliente: any, loncliente: any, ): Observable<any> {

        let busca = busqueda.toString();
        busca.replace(" ","_");
        console.log(busca);

        let url = this.api + 'getbusquedatiendasnewhorarios/' + busqueda + "/" + latcliente + "/" + loncliente;
        let cacheKey = url;
        let request = this.http.get(url);
        // console.warn(url)
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerBusquedaArticulosTienda(busqueda): Observable<any> {
        let url = this.api + 'getbusquedaarticulostendero/' + busqueda;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerBusquedaProductosCercanos(busqueda, loncliente: any, latcliente: any): Observable<any> {
        let busca = busqueda.toString();
        busca.replace(" ","_");
        console.log(busca);
        
        let url = this.api + "obtenerbusquedaproductoscercanos/" + busqueda + "/" + latcliente + "/" + loncliente;
        let cacheKey = url;
        let request = this.http.get(url);
        console.warn(url)
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerBusquedaProductosCercanosbyCod(codigo, loncliente: any, latcliente: any): Observable<any> {
        let url = this.api + "obtenerbusquedaproductoscercanosbycodigo/" + codigo + "/" + latcliente + "/" + loncliente;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    newpostPedido(cliente, tendero, estatus, factura, propina, comision, userIdtendero, codtipopago, envio) {
        let idcliente = this.pushService.userId;
        this.cache.clearAll();
        const path = this.api + "newcrearpedidoapi/";
        let datos = `cod_cliente=${cliente}&cod_tendero=${tendero}&estatus=${estatus}&totalfactura=${factura}&propina=${propina}&comision=${comision}&useridtendero=${userIdtendero}&useridcliente=${idcliente}&tipo_pago=${codtipopago}&envio=${envio}`;
        return this.http.post(path, datos, this.httpOptions);
    }

    postPedidoLinea(articulo, codigo, cantidad, preciou, preciol, comentariosl) {
        this.cache.clearAll();
        const path = this.api + "postpedidolineas/";
        let datos = `cod_articulos=${articulo}&cod_ventas=${codigo}&cantidad=${cantidad}&precioUnitario=${preciou}&precioLinea=${preciol}&comentarios=${comentariosl}`;
        return this.http.post(path, datos, this.httpOptions);
    }

    postDetalleMenuPedidoLinea(codpedidolinea, codarticulo, opcionproducto, opcionmenu) {
        this.cache.clearAll();
        const path = this.api + "postdetallemenupedidolineas/";
        let datos = `cod_pedidolinea=${codpedidolinea}&cod_articulos=${codarticulo}&opcion_producto=${opcionproducto}&opcion_menu=${opcionmenu}`;
        return this.http.post(path, datos, this.httpOptions);
    }

    postComision(rangoinicial, rangofinal, comision, descripcion, tendero, codigo) {
        this.cache.clearAll();
        const path = this.api + "postcomision/";
        let datos = `rangoinicial=${rangoinicial}&rangofinal=${rangofinal}&comision=${comision}&descripcion=${descripcion}&cod_tendero=${tendero}&cod_pedido=${codigo}`;
        return this.http.post(path, datos, this.httpOptions);
    }


    /** REVIEW - VERSION 1.3.0
* Versionamiento para la App Clientes
* Este archivo api se compone de los métodos funcionales para realizar POST, GET, UPDATE y DELETE
* para la version 1.3.0
* */

    public obtenerMenuTodosDias(codigo) {
        let url = this.api + "obtenermenusproductotodoslosdias/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    // Obtener el menu de un producto segun el codigo del menu
    public obtenerMenudeunProducto(codigo) {
        let url = this.api + "veropcionmenusproductosindia/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerbtnmenuproductos(codigo, codpedidolinea) {
        let url = this.api + 'obtenerbtnmenuproductos/' + codigo + "/" + codpedidolinea;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    /** REVIEW - VERSION 1.6.0
* Versionamiento para la App Clientes
* Este archivo api se compone de los métodos funcionales para realizar POST, GET, UPDATE y DELETE
* para la version 1.6.0
* */
    public obtenerestadopedido(codventa) {
        let url = this.api + 'obtenerestadopedido/' + codventa;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerTodosPedidosClienteHistoricoSemana(codigo): Observable<any> {
        this.cache.clearAll();
        let url = this.api + "obtenerpedidosporclientehistoricosemana/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerTodosPedidosClienteHistoricoDia(codigo): Observable<any> {
        this.cache.clearAll();
        let url = this.api + "obtenerpedidosporclientehistoricodia/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    //--------------------------- obtener pedidos mes historico-------------------------------
    public obtenerTodosPedidosClienteHistorico(codigo): Observable<any> {
        this.cache.clearAll();
        let url = this.api + "obtenerpedidosporclientehistorico/" + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerDireccionesCliente(codigo) {
        let url = this.api + 'obtenerdireccionescliente/' + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public postaddnuevadireccioncliente(pais, ciudad, direccion, mdetalles, latitud, longitud, cod_cliente, nombredireccion): Observable<any> {
        this.cache.clearAll();
        const path = this.api + "agregarnuevasdirecciones/";
        let datos = `direccion=${direccion}&pais=${pais}&ciudad=${ciudad}&detalles=${mdetalles}&latitud=${latitud}&longitud=${longitud}&cod_cliente=${cod_cliente}&dir_nombre=${nombredireccion}`;
        console.log(datos);
        return this.http.post(path, datos, this.httpOptions);
    }

    public activarnuevadireccion( codigo, cod_cliente ) {
        let url = this.api + 'activardireccioncliente/' + codigo + '/'+ cod_cliente;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public eliminardireccioncliente(codigo) {
        let url = this.api + 'eliminardireccioncliente/' + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

    public obtenerhorariosdetienda( codigo ){
        let url = this.api + 'horariosdeltendero/' + codigo;
        let cacheKey = url;
        let request = this.http.get(url);
        return this.cache.loadFromObservable(cacheKey, request);
    }

}
