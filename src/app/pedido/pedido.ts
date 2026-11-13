
import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Carrito, ProductoCarrito } from '../services/carrito';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './pedido.html',
  styleUrl: './pedido.css'
})
export class Pedido {

  tipoPedido = 'COMER_AHI';

  pedidoConfirmado: any = null;

  constructor(
    public carrito: Carrito,
    private router: Router
  ) {}

  get productos(): ProductoCarrito[] {
    return this.carrito.obtenerProductos();
  }

  get subtotal(): number {
    return this.carrito.obtenerSubtotal();
  }

  get cantidadTotal(): number {
    return this.carrito.obtenerCantidad();
  }

  cambiarCantidad(id: string, cantidad: number): void {
    if (cantidad < 1) return;
    this.carrito.cambiarCantidad(id, cantidad);
  }

  eliminarProducto(id: string): void {
    this.carrito.eliminarProducto(id);
  }

  editarProducto(id: string): void {
    this.carrito.guardarParaEditar(id);
    this.router.navigate(['/menu']);
  }

  confirmarPedido(): void {
    if (this.productos.length === 0) {
      return;
    }

    const numeroOrden = this.carrito.generarNumeroOrden();

    this.pedidoConfirmado = {
      numero: numeroOrden,
      tipo: this.tipoPedido === 'COMER_AHI'
        ? 'Comer aquí'
        : 'Para llevar',
      cantidad: this.cantidadTotal,
      total: this.subtotal,
      productos: this.productos.map(producto => ({
        nombre: producto.nombre,
        cantidad: producto.cantidad,
        precio: producto.precioUnitario,
        importe: producto.precioUnitario * producto.cantidad,
        ingredientes: producto.ingredientes || [],
        extras: producto.extras || [],
        instrucciones: producto.descripcion || ''
      }))
    };
  }

  cerrarConfirmacion(): void {
    this.pedidoConfirmado = null;
    this.carrito.limpiar();
    this.router.navigate(['/menu']);
  }
}
