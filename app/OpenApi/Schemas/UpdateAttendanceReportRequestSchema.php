<?php
namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "UpdateAttendanceReportRequest",
    required: ["attendance_id", "laporan"],
    properties: [
        new OA\Property(property: "attendance_id", type: "integer"),
        new OA\Property(property: "laporan", type: "string"),
        new OA\Property(
            property: "new_images",
            type: "array",
            items: new OA\Items(
                type: "object",
                properties: [
                    new OA\Property(property: "id", type: "integer"),
                    new OA\Property(property: "images", type: "string", format: "binary")
                ]
            )
        ),
        new OA\Property(
            property: "changed_images",
            type: "array",
            items: new OA\Items(
                type: "object",
                properties: [
                    new OA\Property(property: "id", type: "integer"),
                    new OA\Property(property: "images", type: "string", format: "binary")
                ]
            )
        )
    ]
)]
class UpdateAttendanceReportRequestSchema{}
