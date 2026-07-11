<?php
namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;


#[OA\Schema(
    schema: "CreateAdminInfo",
    required: [
        // admin information
        "perusahaan", "divisi", "nomor_telepon"
    ],
    properties: [
        new OA\Property(property: "perusahaan", type: "string"),
        new OA\Property(property: "divisi", type: "string"),
        new OA\Property(property: "nomor_telepon", type: "string")
    ]
)]
class CreateAdminInfoSchema{}