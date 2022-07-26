import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {

  public eventos: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      Response => this.eventos = Response,
      error => console.log(error)
    );

    // this.eventos = [
    //   {
    //     Tema: 'Angular 13',
    //     Local: 'Belo Horizonte',
    //   },
    //   {
    //     Tema: '.Net 5',
    //     Local: 'São Paulo',
    //   },
    //   {
    //     Tema: 'Angular e Suas Novidades',
    //     Local: 'Rio de Janeiro',
    //   },
    // ];
  }
}
