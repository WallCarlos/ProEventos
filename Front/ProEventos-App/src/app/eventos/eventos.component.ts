import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  public eventos: any = [];
  public eventosFiltrados: any = [];

  larguraImagem: number = 150;
  margemImagem: number = 2;
  exibirImagem: boolean = true;
  private _filtroLista: string = '';

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;

    this.eventosFiltrados = this.filtroLista
      ? this.filtrarEventos(this.filtroLista)
      : this.eventos;
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.eventos.filter(
      (evento: {
        eventoId: number;
        tema: string;
        local: string;
        dataEvento: string;
        qtdePessoas: number;
        lote: number;
      }) =>
        evento.eventoId.toString().indexOf(filtrarPor) !== -1 ||
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.dataEvento.toLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.qtdePessoas.toString().indexOf(filtrarPor) !== -1 ||
        evento.lote.toString().indexOf(filtrarPor) !== -1
    );
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEventos();
  }

  alterarImagem() {
    this.exibirImagem = !this.exibirImagem;
  }

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      (Response) => {
        this.eventos = Response;
        this.eventosFiltrados = this.eventos;
      },
      (error) => console.log(error)
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
