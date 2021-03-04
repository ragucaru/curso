import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AgendaService } from '../agenda.service';
import { SharedService } from '../../shared/shared.service';
import { Router, ActivatedRoute  } from '@angular/router';
import { CustomValidator } from '../../utils/classes/custom-validator';

export interface FormDialogData {
  id: number;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(
    private agendaService: AgendaService,
    public dialogRef: MatDialogRef<FormComponent>,
    private fb: FormBuilder,
    private sharedService: SharedService,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData
  ) {}

  isLoading:boolean = false;
  permiso:any = {};

  provideID:boolean = false;
  
  permisoForm = this.fb.group({
    //'id': [{value:'',disabled:true},[Validators.maxLength(32),Validators.minLength(32), Validators.required, CustomValidator.notEqualToValidator('repeatedId')]],
    'nombre':['',[Validators.required]],
    'apellido_paterno': ['',[Validators.required]],
    'apellido_materno': ['',[Validators.required]],
    'direccion': ['',[Validators.required]],
    'telefonos': this.fb.array([this.fb.group({telefono: ['']})])
  });

  ngOnInit() {
    let id = this.data.id;
    if(id){
      this.isLoading = true;
      this.agendaService.getAgenda(id).subscribe(
        response => {
          this.permiso = response.data;
          this.permisoForm.patchValue(this.permiso);
          this.isLoading = false;
        },
        errorResponse => {
          console.log(errorResponse);
          this.isLoading = false;
          if(errorResponse.error){
            if(errorResponse.error.validacion === false){
              this.manageRepeatedIDError(errorResponse);
            }
          }
        });
    }
  }

  saveAgenda(){
    
    this.isLoading = true;
    if(this.permiso.id){
      this.agendaService.updateAgenda(this.permiso.id,this.permisoForm.value).subscribe(
        response =>{
          this.dialogRef.close(true);
          //console.log(response);
          this.isLoading = false;
        },
        errorResponse => {
         // console.log(errorResponse);
          this.isLoading = false;
          if(errorResponse.error){
            if(errorResponse.error.validacion === false){
              this.manageRepeatedIDError(errorResponse);
            }
          }
      });
    }else{
      this.agendaService.createAgenda(this.permisoForm.value).subscribe(
        response =>{
          this.isLoading = false;

          let Message = 'Se agrego el contacto con Éxito';
          this.sharedService.showSnackBar(Message, 'Cerrar', 5000);

          this.dialogRef.close();
         // this.router.navigate(['/agenda']);
      },
        errorResponse => {
         // console.log("garces: "+errorResponse);
          this.isLoading = false;
          if(errorResponse.error){
            if(errorResponse.error.validacion === false){
              this.manageRepeatedIDError(errorResponse);
            }
          }
      });
    }
  }

  toggleID(){
    this.provideID = !this.provideID;
    if(this.provideID){
      this.permisoForm.get('id').enable();
      this.permisoForm.get('id').markAsDirty();
      this.permisoForm.get('id').markAsTouched();
    }else{
      this.permisoForm.get('id').disable();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  manageRepeatedIDError(errorResponse:any){
    if(errorResponse.error.errores){
      for(let i in errorResponse.error.errores){
        if(i == 'id'){
          let errores = errorResponse.error.errores[i];
          for(let j in errores){
            if(errores[j] == 'El ID debe ser único'){
              this.permisoForm.get('repeatedId').patchValue(this.permisoForm.get('id').value);
              this.permisoForm.get('id').enable();
              this.permisoForm.get('id').markAsDirty();
              this.permisoForm.get('id').markAsTouched();
              break;
            }
          }
          break;
        }
      }
    }
  }


  get getTelefonos(){
    return this.permisoForm.get('telefonos') as FormArray;
  }
  addTelefono() {
    const control = <FormArray>this.permisoForm.controls['telefonos'];
    control.push(this.fb.group({telefono: []}));

    console.log("FORM", this.permisoForm.value);
  }

  removeTelefono(index: number){
    const control = <FormArray>this.permisoForm.controls['telefonos'];
    control.removeAt(index);
  }

}