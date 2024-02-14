import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {


  formulario!: FormGroup

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
        ])],
      modelo: ['modelo1']
    })
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(id!).subscribe((pensamento) => {
      this.formulario = this.formBuilder.group({
        id: [pensamento.id],

        conteudo: [pensamento.conteudo, Validators.compose([
          Validators.required,
          Validators.pattern((/(.|\s)*\S(.|\s)*/))
        ])],

        autoria: [pensamento.autoria, Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],

        modelo: [pensamento.modelo],
        favorito: [false]
      })
    })
  }

  editarPensamento() {
    if(this.formulario.valid) {
      this.service.editar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento'])
      })
    }
  }

  habilitarBotao() {
    if(this.formulario.valid) {
      return 'botao__editar'
    } else {
      return 'botao__desabilitado'
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }

}
