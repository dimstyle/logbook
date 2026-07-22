<?php
namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "GetAttendanceDailyResponse",
    required: ["message", "attendance"],
    properties: [
        new OA\Property(property: "message", type: "string"),
        new OA\Property(property: "attendance", ref: "#/components/schemas/DailyAttendance")
    ]
)]
class GetAttendanceDailyResponseSchema{}