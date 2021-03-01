<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTelefonoAgendaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('telefono_agenda', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->smallInteger('agenda_id')->unsigned()->nullable()->index();
            $table->string('numero_telefono')->nullable();                      
            $table->softDeletes();
            $table->timestamps();


            $table->foreign('agenda_id')->references('id')->on('telefono_agenda');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('telefono_agenda');
    }
}
