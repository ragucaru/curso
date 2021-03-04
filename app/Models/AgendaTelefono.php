<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AgendaTelefono extends Model
{
    use SoftDeletes;
    protected $table = 'telefono_agenda';
   

   
}
