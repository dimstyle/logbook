<?php

namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;


#[OA\Schema(
    schema: "CreateAttendanceCheckInRequest",
    required: [
        "sudah_hadir" , "jam_hadir", "wfh"
    ],
    properties: [
        new OA\Property(property: "sudah_hadir",type: "boolean"),
        new OA\Property(property: "jam_hadir", type: "string", format: "time"),
        new OA\Property(property: "wfh", type: "boolean")
    ]
)]
class CreateAttendanceCheckInRequestSchema{}