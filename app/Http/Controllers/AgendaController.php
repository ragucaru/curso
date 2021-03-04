<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Hash;
use Validator;

use App\Http\Controllers\Controller;
use App\Models\Agenda;

use DB;






class AgendaController extends Controller
{
    public function index()
    {
        try{
            $parametros = Input::all();
            
            $agenda = Agenda::with('agendatelefono')->orderBy('nombre');

            //Filtros, busquedas, ordenamiento
            if(isset($parametros['query']) && $parametros['query']){
                $agenda = $agenda->where(function($query)use($parametros){
                    return $query->where('nombre','LIKE','%'.$parametros['query'].'%');
                                //->orWhere('nombre','LIKE','%'.$parametros['query'].'%');
                });
            }                             
           
            return response()->json(['data'=>$agenda],HttpResponse::HTTP_OK);
        }catch(\Exception $e){
            return response()->json(['error'=>['message'=>$e->getMessage(),'line'=>$e->getLine()]], HttpResponse::HTTP_CONFLICT);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $validation_rules = [
                'nombre' => 'required',
                'apellido_paterno' => 'required',   
                'apellido_materno' => 'required' ,
                'direccion' => 'required'           
            ];
        
            $validation_eror_messages = [
                'nombre.required' => 'El nombre es obligatorio',
                'apellido_paterno.required' => 'El apellido paterno es obligatorio',
                'apellido_materno.required' => 'El apellido materno es obligatorio',
                'direccion.required' => 'El Domicilio es obligatorio'
            ];

            $parametros = $request->all();

            $resultado = Validator::make($parametros,$validation_rules,$validation_eror_messages);

            if($resultado->passes()){
                DB::beginTransaction();

                $agenda = new User();
                $agenda->nombre = $parametros['nombre'];
                $agenda->apellido_paterno = $parametros['apellido_paterno'];
                $agenda->apellido_materno = $parametros['apellido_materno'];
                $agenda->direccion = $parametros['direccion'];
               
                
                $agenda->save();

              /*   if(!$agenda->is_superuser){
                    $roles = $parametros['roles'];
                    $permisos = $parametros['permissions'];
                }else{
                    $roles = [];
                    $permisos = [];
                } 
                
                $agenda->roles()->sync($roles);
                $agenda->permissions()->sync($permisos);*/

                DB::commit();

                return response()->json(['data'=>$agenda],HttpResponse::HTTP_OK);
            }else{
                return response()->json(['mensaje' => 'Error en los datos del formulario', 'validacion'=>$resultado->passes(), 'errores'=>$resultado->errors()], HttpResponse::HTTP_CONFLICT);
            }

        }catch(\Exception $e){
            DB::rollback();
            return response()->json(['error'=>['message'=>$e->getMessage(),'line'=>$e->getLine()]], HttpResponse::HTTP_CONFLICT);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CasosCovid\Agenda  $Agenda
     * @return \Illuminate\Http\Response
     */
    public function show(Agenda $agenda)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CasosCovid\Agenda  $Agenda
     * @return \Illuminate\Http\Response
     */
    public function edit(Agenda $agenda)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CasosCovid\Agenda  $Agenda
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Agenda $agenda)
    {
        try{
            $validation_rules = [
                'nombre' => 'required',
                'apellido_paterno' => 'required',   
                'apellido_materno' => 'required' ,
                'direccion' => 'required'           
            ];
        
            $validation_eror_messages = [
                'nombre.required' => 'El nombre es obligatorio',
                'apellido_paterno.required' => 'El apellido paterno es obligatorio',
                'apellido_materno.required' => 'El apellido materno es obligatorio',
                'direccion.required' => 'El Domicilio es obligatorio'
            ];
            $agenda = Agenda::find($id);

            $parametros = $request->all();

            $resultado = Validator::make($parametros,$validation_rules,$validation_eror_messages);

            if($resultado->passes()){
                DB::beginTransaction();

                $agenda->nombre = $parametros['nombre'];
                $agenda->apellido_paterno = $parametros['apellido_paterno'];
                $agenda->apellido_materno = $parametros['apellido_materno'];
                $agenda->direccion = $parametros['direccion'];
               
                
                $agenda->save();

                DB::commit();

                return response()->json(['guardado'=>true,'agenda'=>$agenda],HttpResponse::HTTP_OK);
            }else{
                return response()->json(['mensaje' => 'Error en los datos del formulario', 'validacion'=>$resultado->passes(), 'errores'=>$resultado->errors()], HttpResponse::HTTP_CONFLICT);
            }

        }catch(\Exception $e){
            DB::rollback();
            return response()->json(['error'=>['message'=>$e->getMessage(),'line'=>$e->getLine()]], HttpResponse::HTTP_CONFLICT);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CasosCovid\Agenda  $Agenda
     * @return \Illuminate\Http\Response
     */
    public function destroy(Agenda $agenda)
    {
        //
    }
}
