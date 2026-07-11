<?php 

namespace Modules\User\DTO;
use Illuminate\Support\Collection;

class CreateAdminInfoDTO{
    public function __construct(
        public string $account_id,
        public string $perusahaan,
        public string $divisi,
        public string $nomor_telepon,
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