
import { Injectable } from '@angular/core';

export interface Extra {
  nombre: string;
  precio: number;
}

export interface ProductoCarrito {
  id: string;
  productoId: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  imagen: string;
  precioBase: number;
  ingredientes: string[];
  extras: Extra[];
  cantidad: number;
  precioUnitario: number;
}

@Injectable({
  providedIn: 'root'
})
export class Carrito {
  private readonly clave = 'ember-carrito';
  private readonly claveOrden = 'ember-contador-orden';

  private productos: ProductoCarrito[] = [];
  private productoEdicion: ProductoCarrito | null = null;

  constructor() {
    this.cargar();
  }

  // Cargar productos guardados
  private cargar(): void {
    try {
      const datos = localStorage.getItem(this.clave);

      const productosGuardados: ProductoCarrito[] =
        datos ? JSON.parse(datos) : [];

      // Agrupar productos repetidos que ya estaban guardados
      this.productos = this.agruparProductos(productosGuardados);

      this.guardar();

    } catch {
      this.productos = [];
    }
  }

  // Guardar cambios del carrito
  private guardar(): void {
    localStorage.setItem(
      this.clave,
      JSON.stringify(this.productos)
    );
  }

  // Comprobar si dos productos son exactamente iguales
  private sonIguales(
    productoA: ProductoCarrito,
    productoB: ProductoCarrito
  ): boolean {

    const ingredientesA = [...productoA.ingredientes].sort();
    const ingredientesB = [...productoB.ingredientes].sort();

    const extrasA = [...productoA.extras]
      .sort((a, b) => a.nombre.localeCompare(b.nombre));

    const extrasB = [...productoB.extras]
      .sort((a, b) => a.nombre.localeCompare(b.nombre));

    return (
      productoA.productoId === productoB.productoId &&
      productoA.categoria === productoB.categoria &&
      productoA.precioBase === productoB.precioBase &&
      productoA.precioUnitario === productoB.precioUnitario &&
      productoA.descripcion === productoB.descripcion &&
      JSON.stringify(ingredientesA) ===
        JSON.stringify(ingredientesB) &&
      JSON.stringify(extrasA) ===
        JSON.stringify(extrasB)
    );
  }

  // Agrupar productos repetidos
  private agruparProductos(
    lista: ProductoCarrito[]
  ): ProductoCarrito[] {

    const agrupados: ProductoCarrito[] = [];

    for (const producto of lista) {

      const existente = agrupados.find(item =>
        this.sonIguales(item, producto)
      );

      if (existente) {

        existente.cantidad += producto.cantidad;

      } else {

        agrupados.push({
          ...producto,
          ingredientes: [...producto.ingredientes],
          extras: producto.extras.map(extra => ({ ...extra }))
        });

      }
    }

    return agrupados;
  }

  // Generar número de orden consecutivo
  generarNumeroOrden(): string {

    const ultimoNumero = Number(
      localStorage.getItem(this.claveOrden) || '0'
    );

    const nuevoNumero = ultimoNumero + 1;

    localStorage.setItem(
      this.claveOrden,
      nuevoNumero.toString()
    );

    return 'EMBER-' + nuevoNumero.toString().padStart(6, '0');
  }

  // Obtener todos los productos
  obtenerProductos(): ProductoCarrito[] {

    return this.productos.map(producto => ({
      ...producto,
      ingredientes: [...producto.ingredientes],
      extras: producto.extras.map(extra => ({ ...extra }))
    }));

  }

  // AGREGAR PRODUCTO Y AGRUPAR SI YA EXISTE
  agregarProducto(producto: ProductoCarrito): void {

    const existente = this.productos.find(item =>
      this.sonIguales(item, producto)
    );

    if (existente) {

      // Si ya existe, aumentar su cantidad
      existente.cantidad += producto.cantidad;

    } else {

      // Si es diferente, agregarlo como producto nuevo
      this.productos.push({
        ...producto,
        ingredientes: [...producto.ingredientes],
        extras: producto.extras.map(extra => ({ ...extra }))
      });

    }

    this.guardar();
  }

  // ACTUALIZAR PRODUCTO PERSONALIZADO
  actualizarProducto(
    productoActualizado: ProductoCarrito
  ): void {

    const indice = this.productos.findIndex(
      producto => producto.id === productoActualizado.id
    );

    if (indice === -1) return;

    // Buscar si ya existe otro producto con la misma configuración
    const existente = this.productos.find(
      (producto, i) =>
        i !== indice &&
        this.sonIguales(producto, productoActualizado)
    );

    if (existente) {

      // Unificar cantidades si ahora son iguales
      existente.cantidad += productoActualizado.cantidad;

      // Eliminar el registro que se estaba editando
      this.productos.splice(indice, 1);

    } else {

      // Actualizar normalmente
      this.productos[indice] = {
        ...productoActualizado,
        ingredientes: [...productoActualizado.ingredientes],
        extras: productoActualizado.extras.map(extra => ({ ...extra }))
      };

    }

    this.guardar();
  }

  // Cambiar cantidad de un producto
  cambiarCantidad(id: string, cantidad: number): void {

    const producto = this.productos.find(
      item => item.id === id
    );

    if (!producto) return;

    if (cantidad <= 0) {
      this.eliminarProducto(id);
      return;
    }

    producto.cantidad = cantidad;

    this.guardar();
  }

  // Eliminar producto
  eliminarProducto(id: string): void {

    this.productos = this.productos.filter(
      producto => producto.id !== id
    );

    this.guardar();
  }

  // Calcular subtotal
  obtenerSubtotal(): number {

    return this.productos.reduce(
      (total, producto) =>
        total + producto.precioUnitario * producto.cantidad,
      0
    );

  }

  // Obtener cantidad total de productos
  obtenerCantidad(): number {

    return this.productos.reduce(
      (total, producto) => total + producto.cantidad,
      0
    );

  }

  // Guardar producto para editar
  guardarParaEditar(id: string): void {

    this.productoEdicion =
      this.productos.find(
        producto => producto.id === id
      ) ?? null;

  }

  // Obtener producto para editar
  obtenerParaEditar(): ProductoCarrito | null {

    const producto = this.productoEdicion;

    this.productoEdicion = null;

    if (!producto) return null;

    return {
      ...producto,
      ingredientes: [...producto.ingredientes],
      extras: producto.extras.map(extra => ({ ...extra }))
    };

  }

  // Vaciar carrito sin reiniciar contador de órdenes
  limpiar(): void {

    this.productos = [];
    this.productoEdicion = null;

    this.guardar();
  }
}
