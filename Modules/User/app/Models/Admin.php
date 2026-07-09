<?php

namespace Modules\User\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
// use Modules\User\Database\Factories\AdminFactory;

class Admin extends Model
{
    use HasFactory, Notifiable;
}
