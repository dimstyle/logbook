<?php

namespace Modules\User\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Guarded(["role", "id"])]
class User extends Model
{
    use HasFactory;
}