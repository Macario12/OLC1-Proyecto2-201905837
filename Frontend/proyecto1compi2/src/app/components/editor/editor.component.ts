import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { AnalizarService } from 'src/app/services/analizar.service';
import { DomSanitizer } from '@angular/platform-browser';

import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
  MonacoStandaloneCodeEditor
} from '@materia-ui/ngx-monaco-editor'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @ViewChild(MonacoEditorComponent, { static: false })
  monacoComponent: MonacoEditorComponent = new MonacoEditorComponent(this.monacoLoaderService);
  editorOptions: MonacoEditorConstructionOptions = {
    theme: 'myCustomTheme',
    language: 'javascript',
    roundedSelection: true,
    autoIndent:"full"
  };
  consoleOptions: MonacoEditorConstructionOptions = {
    theme: 'myCustomTheme',
    language: '',
    roundedSelection: true,
    autoIndent:"full",
    readOnly:true
  };

  code = "";
  editorTexto = new FormControl('');
  console = "";
  consola = new FormControl('');
  public TablaDeSimbolos: any;
  public imageSource;
  nombreArchivo = "Choose file"
  indiceEditorActual = 0
  archivo: any
  reporteSelccionado:string = ""

  textoEditores:string[] = [""]

  verArbolModal(imagen: string){
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${imagen}`);
   }

  constructor(private sanitizer: DomSanitizer,private monacoLoaderService: MonacoEditorLoaderService, private analizarService: AnalizarService) {
    this.monacoLoaderService.isMonacoLoaded$
      .pipe(
        filter(isLoaded => isLoaded),
        take(1)
      )
      .subscribe(() => {
        monaco.editor.defineTheme('myCustomTheme', {
          base: 'vs-dark', // can also be vs or hc-black
          inherit: true, // can also be false to completely replace the builtin rules
          rules: [
            {
              token: 'comment',
              foreground: 'ffa500',
              fontStyle: 'italic underline'
            },
            { token: 'comment.js', foreground: '008800', fontStyle: 'bold' },
            { token: 'comment.css', foreground: '0000ff' } // will inherit fontStyle from `comment` above
          ],
          colors: {}
        });
      });
  }
  editorInit(editor: MonacoStandaloneCodeEditor) {
    // monaco.editor.setTheme('vs');
    editor.setSelection({
      startLineNumber: 1,
      startColumn: 1,
      endColumn: 50,
      endLineNumber: 3
    });
  }

  ngOnInit(): void {
  }

  imprimir(){
    console.log(this.consola.value)
    console.log(this.editorTexto.value)
  }

  analizar(){
    var texto = {
      prueba: this.editorTexto.value
    }
    this.analizarService.ejecutar(texto).subscribe((res:any)=>{
      console.log(res)
      this.consola.setValue(res.consola);
      this.TablaDeSimbolos = res.tablaSimbolos
      this.verArbolModal(res.astBase64)
    }, err=>{
      console.log(err)
    });
  }

   seleccionarArchivo(event:any) {
    this.nombreArchivo = event.target.files[0].name
    this.archivo = event.target.files[0]
  }

  cargarArchivo() {
    const reader = new FileReader();
    reader.onload = (e) => {
        const text = reader.result!.toString().trim();
        this.textoEditores[this.indiceEditorActual] = text
    }
    reader.readAsText(this.archivo);
  }
}


  