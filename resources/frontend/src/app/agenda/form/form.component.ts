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
  agenda:any = {};

  provideID:boolean = false;
  
  agendaForm = this.fb.group({
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
          console.log(response);
          this.agenda = response.data;
          this.agendaForm.patchValue(this.agenda);
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
    if(this.agenda.id){
      this.agendaService.updateAgenda(this.agenda.id,this.agendaForm.value).subscribe(
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
      this.agendaService.createAgenda(this.agendaForm.value).subscribe(
        response =>{        
          let Message = 'Se agrego el contacto con Éxito';
          this.sharedService.showSnackBar(Message, 'Cerrar', 5000); 
          this.dialogRef.close(true);
          this.isLoading = false;
       
      },
        errorResponse => {
          console.log("garces: "+errorResponse);
          this.isLoading = false;
          if(errorResponse.error){
            if(errorResponse.error.validacion === false){
              this.manageRepeatedIDError(errorResponse);
              this.sharedService.showSnackBar("Verifique sus datos", 'Cerrar', 5000); 
            }
          }
      });
    }
  }

  toggleID(){
    this.provideID = !this.provideID;
    if(this.provideID){
      this.agendaForm.get('id').enable();
      this.agendaForm.get('id').markAsDirty();
      this.agendaForm.get('id').markAsTouched();
    }else{
      this.agendaForm.get('id').disable();
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
              this.agendaForm.get('repeatedId').patchValue(this.agendaForm.get('id').value);
              this.agendaForm.get('id').enable();
              this.agendaForm.get('id').markAsDirty();
              this.agendaForm.get('id').markAsTouched();
              break;
            }
          }
          break;
        }
      }
    }
  }


  get getTelefonos(){
    return this.agendaForm.get('telefonos') as FormArray;
  }
  addTelefono() {
    const control = <FormArray>this.agendaForm.controls['telefonos'];
    control.push(this.fb.group({telefono: []}));

   // console.log("FORM", this.agendaForm.value);
    console.log("FORM", this.agendaForm);
  }

  removeTelefono(index: number){
    const control = <FormArray>this.agendaForm.controls['telefonos'];
    control.removeAt(index);
  }

  numberOnly(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}