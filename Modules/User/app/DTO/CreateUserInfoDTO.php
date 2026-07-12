<?php 

namespace Modules\User\DTO;
use Illuminate\Support\Collection;

class CreateUserInfoDTO{
    public function __construct(
        public string $admin_id,
        public string $account_id,
        public string $nama_lengkap,
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
