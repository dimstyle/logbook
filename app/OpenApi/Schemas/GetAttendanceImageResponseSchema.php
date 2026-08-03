<?php
namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "GetAttendanceImageResponse",
    type: "string",
    format: "binary"
)]
class GetAttendanceImageResponseSchema{}
