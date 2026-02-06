import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService, JuegoFisico } from '../../services/game.service';

@Component({
  selector: 'app-mochila',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cart-toggle" (click)="toggleCart()">
      <div class="toggle-content">
        <span class="cart-icon"></span>
        <span class="label"></span>
      </div>
      <span class="badge">{{ count }}</span>
    </div>

    <div class="cart-panel" [class.open]="isOpen">
      <div class="header">
        <h2 class="neon-title">MI INVENTARIO</h2>
        <button class="close-btn" (click)="toggleCart()">CERRAR</button>
      </div>

      <div class="cart-items">
        @if (items.length === 0) {
          <p class="empty-msg">NO HAY ARTÍCULOS EN LA LISTA</p>
        } @else {
          @for (item of items; track $index) {
            <div class="item-row">
              <img [src]="item.imagen" class="mini-img">
              <div class="info">
                <span class="name">{{ item.nombre }}</span>
                <span class="price">{{ item.precio }} ₲</span>
              </div>
              <button class="del-btn" (click)="eliminar($index)">BORRAR</button>
            </div>
          }
        }
      </div>

      <div class="footer">
        <div class="total-line">TOTAL: {{ total }} ₲</div>
        <div class="actions">
          <button class="clear-btn" (click)="vaciar()">VACIAR INVENTARIO</button>
          <button class="buy-btn" [disabled]="items.length === 0">FINALIZAR COMPRA</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Botón Flotante con Icono y Texto */
    .cart-toggle {
      position: fixed; top: 20px; right: 20px;
      background: #ff00ff; padding: 12px 20px; border-radius: 8px;
      cursor: pointer; z-index: 1001; box-shadow: 0 0 15px #ff00ff;
      display: flex; align-items: center; gap: 12px;
      transition: transform 0.2s ease;
    }
    .cart-toggle:hover { transform: scale(1.05); }
    
    .toggle-content { display: flex; align-items: center; gap: 8px; }
    .cart-icon { font-size: 1.2rem; }
    .label { color: white; font-weight: bold; font-size: 0.8rem; letter-spacing: 1px; }
    .badge { background: white; color: black; border-radius: 4px; padding: 2px 8px; font-size: 0.8rem; font-weight: bold; }

    
    .cart-panel {
      position: fixed; top: 0; right: -400px; width: 380px; height: 100vh;
      background: #0d001a; border-left: 2px solid #bc13fe;
      transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1); z-index: 1000; 
      display: flex; flex-direction: column; color: white; padding: 25px;
    }
    .cart-panel.open { right: 0; }

    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #bc13fe; padding-bottom: 15px; }
    .neon-title { font-size: 1.2rem; color: #fff; text-shadow: 0 0 10px #bc13fe; margin: 0; }
    .close-btn { background: transparent; border: 1px solid #ff00ff; color: #ff00ff; padding: 5px 10px; cursor: pointer; font-size: 0.7rem; }

    .cart-items { flex-grow: 1; overflow-y: auto; margin: 20px 0; padding-right: 10px; }
    
    .item-row { 
      display: flex; align-items: center; gap: 12px; margin-bottom: 15px; 
      background: rgba(188, 19, 254, 0.1); padding: 12px; border-radius: 8px; 
      border: 1px solid rgba(255, 0, 255, 0.1);
    }
    .mini-img { width: 45px; height: 45px; object-fit: cover; border-radius: 4px; }
    .info { flex-grow: 1; }
    .name { display: block; font-size: 0.85rem; font-weight: bold; }
    .price { color: #ff00ff; font-size: 0.8rem; }
    
    .del-btn { 
      background: transparent; border: 1px solid #ff4444; color: #ff4444; 
      padding: 4px 8px; border-radius: 4px; font-size: 0.65rem; cursor: pointer;
      transition: 0.2s;
    }
    .del-btn:hover { background: #ff4444; color: white; }

    .footer { border-top: 1px solid #bc13fe; padding-top: 20px; }
    .total-line { font-size: 1.4rem; text-align: right; margin-bottom: 20px; color: #00ffff; text-shadow: 0 0 5px #00ffff; }
    
    .actions { display: flex; flex-direction: column; gap: 10px; }
    .clear-btn { background: #333; color: #ccc; border: none; padding: 12px; border-radius: 5px; cursor: pointer; font-size: 0.8rem; }
    .buy-btn { background: #ff00ff; color: white; border: none; padding: 15px; border-radius: 5px; cursor: pointer; font-weight: bold; letter-spacing: 1px; }
    .buy-btn:hover:not(:disabled) { box-shadow: 0 0 15px #ff00ff; }
    .buy-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    ¿
    @media (max-width: 480px) {
      .cart-panel { width: 100%; }
      .label { display: none; }
    }
  `]
})
export class MochilaComponent implements OnInit {
  items: JuegoFisico[] = [];
  count = 0;
  total = 0;
  isOpen = false;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.cart$.subscribe(items => {
      this.items = items;
      this.count = items.length;
      this.total = items.reduce((acc, i) => acc + i.precio, 0);
    });
  }

  toggleCart() { this.isOpen = !this.isOpen; }

  eliminar(index: number) {
    this.gameService.removeFromCart(index);
  }

  vaciar() {
    if (confirm('¿DESEA VACIAR TODO EL INVENTARIO?')) {
      this.gameService.clearCart();
    }
  }
}