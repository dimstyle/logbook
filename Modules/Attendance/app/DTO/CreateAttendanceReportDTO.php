<?php
namespace Modules\Attendance\DTO;

use Illuminate\Support\Collection;

class CreateAttendanceReportDTO {
    public function __construct(
        public string $laporan,
        public  array $images
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