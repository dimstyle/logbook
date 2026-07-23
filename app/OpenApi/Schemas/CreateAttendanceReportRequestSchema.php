<?php
namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;


#[OA\Schema(
    schema: "CreateAttendanceReportRequest",
    required: ["laporan","images"],
    properties: [
        new OA\Property(property: "laporan", type: "string"),
        new OA\Property(
            property: "images", 
            type: "array",
            items: new OA\Items(type: "string", format: "binary")
        )
    ]
)]
class CreateAttendanceReportRequestSchema{}