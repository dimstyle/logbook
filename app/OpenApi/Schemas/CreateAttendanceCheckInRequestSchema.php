<?php

namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;


#[OA\Schema(
    schema: "CreateAttendanceCheckInRequest",
    required: [
        "status" , "jam_hadir", "alasan"
    ],
    properties: [
        new OA\Property(property: "status",type: "string"),
        new OA\Property(property: "jam_hadir", type: "string", format: "time"),
        new OA\Property(property: "alasan", type: "string")
    ]
)]
class CreateAttendanceCheckInRequestSchema{}