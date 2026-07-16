<?php

namespace Modules\Auth\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Modules\Auth\Database\Factories\AccountFactory;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;


#[Fillable(['username','email','password','role','is_active'])]
class Account extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected static function newFactory(): Factory
    {
        return AccountFactory::new();
    }
    
    public function getJWTIdentifier(){
        return $this->getKey();
    }

    public function getJWTCustomClaims(){
        return [
            'role' => $this->role,
            'username' => $this->username

        ];
    }
}
