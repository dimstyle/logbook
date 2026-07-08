<?php 

namespace Modules\Auth\DTO;
use Illuminate\Support\Collection;

class LoginAuthDTO {
    public function __construct(
        public string $email,
        public string $password
    ){}

    public static function fromArray(array $data): self{
        return new self(...$data);
    }

    public function toCollect(): Collection{ 
        return collect($this->toArray());
    }

    public function toArray(): Array{
        return get_object_vars($this);
    }
}