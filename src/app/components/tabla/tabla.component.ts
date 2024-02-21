import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent {
  @Input() Usuarios:{id:number | string, name: string } []=[];
  @Input() tituloTabla: string ='';

}
