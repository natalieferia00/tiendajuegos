import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface JuegoFisico {
  id: number;
  nombre: string;
  precio: number;
  formato: 'CARTUCHO' | 'DISCO_OPTICO' | 'HOLODISCO';
  estado: string;
  imagen: string;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly STORAGE_KEY = 'neon_store_inventory';


  private readonly catalogo: JuegoFisico[] = [
    {
      id: 101,
      nombre: 'STAR WARS: KOTOR III',
      precio: 450,
      formato: 'CARTUCHO',
      estado: 'SELLADO',
      imagen: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/32370/header.jpg'
    },
    {
      id: 202,
      nombre: 'REPUBLIC COMMANDO II',
      precio: 300,
      formato: 'HOLODISCO',
      estado: 'RECUPERADO',
      imagen: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/6060/header.jpg'
    },
    {
      id: 303,
      nombre: 'BATTLEFRONT LEGACY',
      precio: 150,
      formato: 'DISCO_OPTICO',
      estado: 'USADO',
      imagen: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1058020/header.jpg'
    },
    {
      id: 404,
      nombre: 'ELDEN RING',
      precio: 599,
      formato: 'DISCO_OPTICO',
      estado: 'SELLADO',
      imagen: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg'
    },
    {
      id: 505,
      nombre: 'FF VII REBIRTH',
      precio: 699,
      formato: 'DISCO_OPTICO',
      estado: 'PRE-ORDER',
      imagen: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1608070/header.jpg'
    }
  ];


  private cartSubject = new BehaviorSubject<JuegoFisico[]>(this.getStoredCart());


  cart$ = this.cartSubject.asObservable();

  constructor() { }


  getJuegos(): JuegoFisico[] {
    return this.catalogo;
  }

  addToCart(juego: JuegoFisico): void {
    const currentCart = this.getStoredCart();
    const updatedCart = [...currentCart, juego];
    this.saveAndRefresh(updatedCart);
  }


  removeFromCart(index: number): void {
    const currentCart = this.getStoredCart();
    if (index > -1 && index < currentCart.length) {
      currentCart.splice(index, 1);
      this.saveAndRefresh(currentCart);
    }
  }


  clearCart(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.cartSubject.next([]);
  }


  private getStoredCart(): JuegoFisico[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }


  private saveAndRefresh(items: JuegoFisico[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    this.cartSubject.next(items);
  }
}