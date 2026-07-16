<?php 

namespace Modules\Attendance\DTO;
use Illuminate\Support\Collection;

class CreateAttendanceCheckOutDTO {
    public function __construct(
        public bool $sudah_pulang,
        public string $jam_pulang
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