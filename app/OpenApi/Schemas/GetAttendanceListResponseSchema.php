<?php
namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "GetAttendanceListResponse",
    required: ["message", "attendances"],
    properties: [
        new OA\Property(property: "message", type: "string"),
        new OA\Property(
            property: "attendances",
            type: "array",
            items: new OA\Items(type: "object")
        )
    ]
)]
class GetAttendanceListResponseSchema{}
