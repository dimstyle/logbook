<?php 

namespace Modules\Auth\DTO;
use Illuminate\Support\Collection;

class RegisterAuthDTO {
    public function __construct(
        public string $username,
        public string $email,
        public string $password,
        public string $sekolah,
        public string $jurusan,
        public string $nomor_telepon,
        public string $periode_awal,
        public string $periode_akhir
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