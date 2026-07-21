<?php 

namespace Modules\Attendance\DTO;
use Illuminate\Support\Collection;

class CreateAttendanceCheckInDTO {
    public function __construct(
        public string $status,
        public string $jam_hadir,
        public string|null $alasan
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