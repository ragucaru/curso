<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Agenda extends Model
{
    use SoftDeletes;
    protected $table = 'agenda';
   

    public function agendatelefono(){
        return $this->hasMany('App\Models\AgendaTelefono','agenda_id','id');
    }
}
