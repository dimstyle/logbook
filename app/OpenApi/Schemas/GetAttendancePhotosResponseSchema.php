<?php
namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "GetAttendancePhotosResponse",
    required: ["message", "photos"],
    properties: [
        new OA\Property(property: "message", type: "string"),
        new OA\Property(
            property: "photos",
            type: "array",
            items: new OA\Items(type: "object")
        )
    ]
)]
class GetAttendancePhotosResponseSchema{}
