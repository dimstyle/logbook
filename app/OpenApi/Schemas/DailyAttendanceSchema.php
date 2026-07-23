<?php 

namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "DailyAttendance",
    required: [
        "account_id", "id",

        "jam_hadir" , "jam_pulang",

        "laporan", "created_date"
    ],

    properties: [
        new OA\Property(property: "account_id", type: "integer"),
        new OA\Property(property: "id", type: "integer"),

        new OA\Property(property: "jam_hadir", type: "string", format: "time"),
        new OA\Property(property: "jam_pulang", type: "string", format: "time"),

        new OA\Property(property: "laporan", type: "string"),
        new OA\Property(property: "created_date", type: "string", format: "date")

    ]
)]
class DailyAttendanceSchema{}