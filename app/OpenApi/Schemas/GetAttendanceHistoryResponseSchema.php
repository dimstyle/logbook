<?php
namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "GetAttendanceHistoryResponse",
    required: ["message", "attendance"],
    properties: [
        new OA\Property(property: "message", type: "string"),
        new OA\Property(
            property: "attendances", 
            type: "array",
            items: new OA\Items(
                ref: "#/components/schemas/DailyAttendance"
            )
        )
    ]
)]
class GetAttendanceHistoryResponseSchema{}