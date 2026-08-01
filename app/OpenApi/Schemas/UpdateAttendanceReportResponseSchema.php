<?php
namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "UpdateAttendanceReportResponse",
    required: ["message"],
    properties: [
        new OA\Property(property: "message", type: "string")
    ]
)]
class UpdateAttendanceReportResponseSchema{}
