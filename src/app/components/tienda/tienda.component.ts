import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService, JuegoFisico } from '../../services/game.service';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  juegos: JuegoFisico[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    const data = this.gameService.getJuegos();
    if (data) {
      this.juegos = data;
    }
  }

  adquirir(juego: JuegoFisico) {
    this.gameService.addToCart(juego);
  }
}