<?php
namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "CreateAttendanceCheckOutRequest",
    required: ["jam_pulang"],
    properties: [
        new OA\Property(property: "jam_pulang", type: "string", format: "time")
    ]
)]
class CreateAttendanceCheckOutRequestSchema{}