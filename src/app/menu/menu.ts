
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Carrito, Extra, ProductoCarrito } from '../services/carrito';

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
  imagen: string;
  ingredientes: string[];
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, CurrencyPipe],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu implements OnInit, OnDestroy {

  busqueda = '';
  categoriaSeleccionada = 'TODOS';
  mensajeCarrito = '';

  private overflowAnteriorBody = '';
  private overflowAnteriorHtml = '';

  categorias = [
    'TODOS',
    'HAMBURGUESAS',
    'PAPAS',
    'BEBIDAS',
    'COMPLEMENTOS'
  ];

  productos: Producto[] = [

    // HAMBURGUESAS

    {
      id: 1,
      nombre: 'EMBER CLÁSICA',
      categoria: 'HAMBURGUESAS',
      descripcion: 'Carne de res a la parrilla, queso cheddar, lechuga, tomate y nuestra salsa especial.',
      precio: 129,
      imagen: '/images/Ember clasica.png',
      ingredientes: ['Carne de res', 'Queso cheddar', 'Lechuga', 'Tomate', 'Salsa especial']
    },
    {
      id: 2,
      nombre: 'DOBLE BRASA',
      categoria: 'HAMBURGUESAS',
      descripcion: 'Doble carne de res, doble queso cheddar, tocino crujiente y salsa BBQ.',
      precio: 169,
      imagen: '/images/Doble Brasa Ember.png',
      ingredientes: ['Doble carne', 'Queso cheddar', 'Tocino', 'Salsa BBQ']
    },
    {
      id: 3,
      nombre: 'BBQ BACON',
      categoria: 'HAMBURGUESAS',
      descripcion: 'Carne a la parrilla, tocino, cebolla caramelizada y salsa BBQ.',
      precio: 149,
      imagen: '/images/BBQ BACON.png',
      ingredientes: ['Carne de res', 'Tocino', 'Cebolla caramelizada', 'Salsa BBQ']
    },
    {
      id: 4,
      nombre: 'EMBER ESPECIAL',
      categoria: 'HAMBURGUESAS',
      descripcion: 'Carne de res, queso, aguacate y aderezo especial de la casa.',
      precio: 179,
      imagen: '/images/Ember Especial.png',
      ingredientes: ['Carne de res', 'Queso', 'Aguacate', 'Aderezo de la casa']
    },
    {
      id: 10,
      nombre: 'CRISPY CHICKEN',
      categoria: 'HAMBURGUESAS',
      descripcion: 'Pollo crujiente, lechuga fresca, tomate y aderezo de la casa.',
      precio: 139,
      imagen: '/images/Crispy Chicken.png',
      ingredientes: ['Pollo crispy', 'Lechuga', 'Tomate', 'Aderezo de la casa']
    },
    {
      id: 11,
      nombre: 'EMBER BBQ DOBLE',
      categoria: 'HAMBURGUESAS',
      descripcion: 'Doble carne, queso americano, tocino y abundante salsa BBQ.',
      precio: 189,
      imagen: '/images/Ember Bbq Doble.png',
      ingredientes: ['Doble carne', 'Queso americano', 'Tocino', 'Salsa BBQ']
    },
    {
      id: 12,
      nombre: 'SPICY EMBER',
      categoria: 'HAMBURGUESAS',
      descripcion: 'Carne a la parrilla, jalapeños, queso pepper jack y salsa picante.',
      precio: 159,
      imagen: '/images/Spicy Ember.png',
      ingredientes: ['Carne de res', 'Jalapeños', 'Queso pepper jack', 'Salsa picante']
    },
    {
      id: 13,
      nombre: 'HAWAIANA GRILL',
      categoria: 'HAMBURGUESAS',
      descripcion: 'Carne de res, piña asada, jamón, queso y salsa especial.',
      precio: 159,
      imagen: '/images/Hawaina Grill.png',
      ingredientes: ['Carne de res', 'Piña', 'Jamón', 'Queso', 'Salsa especial']
    },

    // PAPAS

    {
      id: 5,
      nombre: 'PAPAS CLÁSICAS',
      categoria: 'PAPAS',
      descripcion: 'Papas fritas doradas y crujientes con un toque de sal.',
      precio: 59,
      imagen: '/images/Papas Clasicas.png',
      ingredientes: []
    },
    {
      id: 6,
      nombre: 'PAPAS CON QUESO',
      categoria: 'PAPAS',
      descripcion: 'Papas fritas cubiertas con una deliciosa salsa de queso cheddar.',
      precio: 79,
      imagen: '/images/Papas con queso.png',
      ingredientes: []
    },
    {
      id: 14,
      nombre: 'PAPAS CON TOCINO',
      categoria: 'PAPAS',
      descripcion: 'Papas crujientes con tocino dorado y queso cheddar.',
      precio: 89,
      imagen: '/images/Papas con tocino.png',
      ingredientes: []
    },
    {
      id: 15,
      nombre: 'PAPAS GAJO',
      categoria: 'PAPAS',
      descripcion: 'Papas en gajos sazonadas con especias de la casa.',
      precio: 69,
      imagen: '/images/Papas Gajo.png',
      ingredientes: []
    },
    {
      id: 16,
      nombre: 'PAPAS EMBER',
      categoria: 'PAPAS',
      descripcion: 'Papas con queso cheddar, tocino y salsa especial.',
      precio: 99,
      imagen: '/images/Papas ember.png',
      ingredientes: []
    },
    {
      id: 17,
      nombre: 'PAPAS SAZONADAS',
      categoria: 'PAPAS',
      descripcion: 'Papas fritas con una mezcla especial de especias.',
      precio: 69,
      imagen: '/images/Papas sazonadas.png',
      ingredientes: []
    },

    // BEBIDAS

    {
      id: 7,
      nombre: 'COCA-COLA',
      categoria: 'BEBIDAS',
      descripcion: 'Coca-Cola fría de 600 ml.',
      precio: 35,
      imagen: '/images/Coca-cola.png',
      ingredientes: []
    },
    {
      id: 18,
      nombre: 'COCA-COLA ZERO',
      categoria: 'BEBIDAS',
      descripcion: 'Coca-Cola Zero Sugar de 600 ml.',
      precio: 35,
      imagen: '/images/Coca-Cola Zero.png',
      ingredientes: []
    },
    {
      id: 19,
      nombre: 'SPRITE',
      categoria: 'BEBIDAS',
      descripcion: 'Refresco Sprite de 600 ml.',
      precio: 35,
      imagen: '/images/Sprite.png',
      ingredientes: []
    },
    {
      id: 20,
      nombre: 'FANTA NARANJA',
      categoria: 'BEBIDAS',
      descripcion: 'Refresco de naranja de 600 ml.',
      precio: 35,
      imagen: '/images/Fanta Naranja.png',
      ingredientes: []
    },
    {
      id: 21,
      nombre: 'PEPSI',
      categoria: 'BEBIDAS',
      descripcion: 'Refresco Pepsi de 600 ml.',
      precio: 35,
      imagen: '/images/Pepsi.png',
      ingredientes: []
    },
    {
      id: 22,
      nombre: 'MANZANITA',
      categoria: 'BEBIDAS',
      descripcion: 'Refresco sabor manzana de 600 ml.',
      precio: 35,
      imagen: '/images/Manzanita.png',
      ingredientes: []
    },
    {
      id: 23,
      nombre: 'AGUA NATURAL',
      categoria: 'BEBIDAS',
      descripcion: 'Agua natural embotellada de 600 ml.',
      precio: 25,
      imagen: '/images/Agua Natural.png',
      ingredientes: []
    },
    {
      id: 24,
      nombre: 'LIMONADA',
      categoria: 'BEBIDAS',
      descripcion: 'Limonada natural preparada al momento.',
      precio: 39,
      imagen: '/images/Limonada.png',
      ingredientes: []
    },
    {
      id: 8,
      nombre: 'MALTEADA DE VAINILLA',
      categoria: 'BEBIDAS',
      descripcion: 'Malteada cremosa de vainilla preparada al momento.',
      precio: 69,
      imagen: '/images/Malteada de Vainilla.png',
      ingredientes: []
    },
    {
      id: 25,
      nombre: 'MALTEADA DE CHOCOLATE',
      categoria: 'BEBIDAS',
      descripcion: 'Malteada de chocolate con una textura cremosa.',
      precio: 75,
      imagen: '/images/Malteada de Chocolate.png',
      ingredientes: []
    },
    {
      id: 26,
      nombre: 'MALTEADA DE FRESA',
      categoria: 'BEBIDAS',
      descripcion: 'Malteada de fresa preparada con helado.',
      precio: 75,
      imagen: '/images/Malteada de Fresa.png',
      ingredientes: []
    },
    {
      id: 27,
      nombre: 'TÉ HELADO',
      categoria: 'BEBIDAS',
      descripcion: 'Té helado refrescante de 500 ml.',
      precio: 39,
      imagen: '/images/Te Helado.png',
      ingredientes: []
    },

    // COMPLEMENTOS

    {
      id: 9,
      nombre: 'AROS DE CEBOLLA',
      categoria: 'COMPLEMENTOS',
      descripcion: 'Aros de cebolla empanizados y crujientes.',
      precio: 65,
      imagen: '/images/Aros de Cebolla.png',
      ingredientes: []
    },
    {
      id: 28,
      nombre: 'NUGGETS DE POLLO',
      categoria: 'COMPLEMENTOS',
      descripcion: 'Seis piezas de nuggets de pollo crujientes.',
      precio: 75,
      imagen: '/images/Nuggets de pollo.png',
      ingredientes: []
    },
    {
      id: 29,
      nombre: 'DEDOS DE POLLO',
      categoria: 'COMPLEMENTOS',
      descripcion: 'Deliciosos dedos de pollo empanizados.',
      precio: 85,
      imagen: '/images/Dedos de pollo.png',
      ingredientes: []
    },
    {
      id: 30,
      nombre: 'JALAPEÑOS RELLENOS',
      categoria: 'COMPLEMENTOS',
      descripcion: 'Jalapeños rellenos de queso y empanizados.',
      precio: 79,
      imagen: '/images/Jalapeños rellenos.png',
      ingredientes: []
    },
    {
      id: 31,
      nombre: 'ALITAS BBQ',
      categoria: 'COMPLEMENTOS',
      descripcion: 'Alitas de pollo bañadas en salsa BBQ.',
      precio: 109,
      imagen: '/images/Alitas bbq.png',
      ingredientes: []
    },
    {
      id: 32,
      nombre: 'ALITAS BUFALO',
      categoria: 'COMPLEMENTOS',
      descripcion: 'Alitas de pollo con salsa búfalo ligeramente picante.',
      precio: 109,
      imagen: '/images/Alitas bbq.png',
      ingredientes: []
    },
    {
      id: 33,
      nombre: 'ENSALADA DE LA CASA',
      categoria: 'COMPLEMENTOS',
      descripcion: 'Ensalada fresca con lechuga, tomate y aderezo.',
      precio: 69,
      imagen: '/images/Ensalada de la casa.png',
      ingredientes: []
    },
    {
      id: 34,
      nombre: 'AROS Y DEDOS DE POLLO',
      categoria: 'COMPLEMENTOS',
      descripcion: 'Tiras de pollo empanizadas acompañadas de salsa.',
      precio: 89,
      imagen: '/images/Dedos de pollo.png',
      ingredientes: []
    }
  ];

  extrasDisponibles: Extra[] = [
    { nombre: 'Queso extra', precio: 15 },
    { nombre: 'Tocino', precio: 20 },
    { nombre: 'Carne extra', precio: 35 },
    { nombre: 'Aguacate', precio: 20 }
  ];

  productoSeleccionado: Producto | null = null;

  ingredientesSeleccionados: string[] = [];
  extrasSeleccionados: Extra[] = [];

  tipoCarne = 'Término medio';
  instrucciones = '';
  cantidad = 1;

  editandoId: string | null = null;

  constructor(
    public carrito: Carrito,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productoEditar = this.carrito.obtenerParaEditar();

    if (productoEditar) {
      const producto = this.productos.find(
        item => item.id === productoEditar.productoId
      );

      if (producto) {
        this.abrirPersonalizacion(producto, productoEditar);
      }
    }
  }

  ngOnDestroy(): void {
    this.restaurarScroll();
  }

  private bloquearScroll(): void {
    if (this.productoSeleccionado) {
      return;
    }

    this.overflowAnteriorBody = document.body.style.overflow;
    this.overflowAnteriorHtml = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  private restaurarScroll(): void {
    document.body.style.overflow = this.overflowAnteriorBody;
    document.documentElement.style.overflow = this.overflowAnteriorHtml;
  }

  get esHamburguesa(): boolean {
    return this.productoSeleccionado?.categoria === 'HAMBURGUESAS';
  }

  get productosFiltrados(): Producto[] {
    const texto = this.busqueda.toLowerCase().trim();

    return this.productos.filter(producto => {

      const coincideCategoria =
        this.categoriaSeleccionada === 'TODOS' ||
        producto.categoria === this.categoriaSeleccionada;

      const coincideBusqueda =
        producto.nombre.toLowerCase().includes(texto) ||
        producto.descripcion.toLowerCase().includes(texto);

      return coincideCategoria && coincideBusqueda;
    });
  }

  get carritoCantidad(): number {
    return this.carrito.obtenerCantidad();
  }

  get precioPersonalizado(): number {
    if (!this.productoSeleccionado) {
      return 0;
    }

    const precioExtras = this.esHamburguesa
      ? this.extrasSeleccionados.reduce(
          (total, extra) => total + extra.precio,
          0
        )
      : 0;

    return this.productoSeleccionado.precio + precioExtras;
  }

  seleccionarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
  }

  // AGREGAR PAPAS, BEBIDAS Y COMPLEMENTOS DIRECTAMENTE

  agregarDirectamente(producto: Producto): void {

    const productoCarrito: ProductoCarrito = {
      id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      productoId: producto.id,
      nombre: producto.nombre,
      categoria: producto.categoria,
      descripcion: '',
      imagen: producto.imagen,
      precioBase: producto.precio,
      ingredientes: [],
      extras: [],
      cantidad: 1,
      precioUnitario: producto.precio
    };

    this.carrito.agregarProducto(productoCarrito);

    this.mensajeCarrito =
      `${producto.nombre} agregado al pedido.`;
  }

  // PERSONALIZACIÓN DE HAMBURGUESAS

  abrirPersonalizacion(
    producto: Producto,
    productoEditar?: ProductoCarrito
  ): void {

    this.bloquearScroll();

    this.productoSeleccionado = producto;

    this.cantidad = productoEditar?.cantidad ?? 1;

    this.ingredientesSeleccionados = productoEditar
      ? [...productoEditar.ingredientes]
      : [...producto.ingredientes];

    this.extrasSeleccionados = productoEditar
      ? [...productoEditar.extras]
      : [];

    this.tipoCarne = 'Término medio';
    this.instrucciones = '';

    if (productoEditar) {

      const partes = productoEditar.descripcion.split(' | ');

      this.tipoCarne =
        partes[0]?.replace('Término de carne: ', '') ||
        'Término medio';

      this.instrucciones =
        partes[1]?.replace('Instrucciones: ', '') || '';

      this.editandoId = productoEditar.id;

    } else {

      this.editandoId = null;

    }
  }

  cerrarPersonalizacion(): void {

    const regresarAlPedido = this.editandoId !== null;

    this.productoSeleccionado = null;
    this.editandoId = null;

    this.ingredientesSeleccionados = [];
    this.extrasSeleccionados = [];

    this.cantidad = 1;
    this.instrucciones = '';
    this.tipoCarne = 'Término medio';

    this.restaurarScroll();

    if (regresarAlPedido) {
      this.router.navigate(['/pedido']);
    }
  }

  tieneIngrediente(nombre: string): boolean {
    return this.ingredientesSeleccionados.includes(nombre);
  }

  cambiarIngrediente(nombre: string, seleccionado: boolean): void {

    if (seleccionado) {

      if (!this.tieneIngrediente(nombre)) {
        this.ingredientesSeleccionados.push(nombre);
      }

    } else {

      this.ingredientesSeleccionados =
        this.ingredientesSeleccionados.filter(
          item => item !== nombre
        );

    }
  }

  tieneExtra(nombre: string): boolean {
    return this.extrasSeleccionados.some(
      extra => extra.nombre === nombre
    );
  }

  cambiarExtra(extra: Extra, seleccionado: boolean): void {

    if (seleccionado) {

      if (!this.tieneExtra(extra.nombre)) {
        this.extrasSeleccionados.push(extra);
      }

    } else {

      this.extrasSeleccionados =
        this.extrasSeleccionados.filter(
          item => item.nombre !== extra.nombre
        );

    }
  }

  aumentarCantidad(): void {
    this.cantidad++;
  }

  disminuirCantidad(): void {

    if (this.cantidad > 1) {
      this.cantidad--;
    }

  }

  guardarProducto(): void {

    if (!this.productoSeleccionado) {
      return;
    }

    const estabaEditando = this.editandoId !== null;

    const ingredientes = [...this.ingredientesSeleccionados];
    const extras = [...this.extrasSeleccionados];

    const descripcion =
      `Término de carne: ${this.tipoCarne} | Instrucciones: ${this.instrucciones}`;

    const precioExtras = extras.reduce(
      (total, extra) => total + extra.precio,
      0
    );

    const productoCarrito: ProductoCarrito = {

      id: this.editandoId ??
        `${Date.now()}-${Math.floor(Math.random() * 10000)}`,

      productoId: this.productoSeleccionado.id,
      nombre: this.productoSeleccionado.nombre,
      categoria: this.productoSeleccionado.categoria,
      descripcion,
      imagen: this.productoSeleccionado.imagen,
      precioBase: this.productoSeleccionado.precio,
      ingredientes,
      extras,
      cantidad: this.cantidad,
      precioUnitario: this.productoSeleccionado.precio + precioExtras

    };

    if (estabaEditando) {

      this.carrito.actualizarProducto(productoCarrito);

      this.mensajeCarrito =
        'Producto actualizado correctamente.';

    } else {

      this.carrito.agregarProducto(productoCarrito);

      this.mensajeCarrito =
        '¡Producto agregado a tu pedido!';

    }

    this.cerrarPersonalizacion();
  }

  // IMAGEN DE RESPALDO

  imagenError(evento: Event): void {

    const imagen = evento.target as HTMLImageElement;

    if (imagen.dataset['fallback'] === 'true') {
      imagen.style.visibility = 'hidden';
      return;
    }

    imagen.dataset['fallback'] = 'true';
    imagen.src = '/images/Ember clasica.png';
  }

}
