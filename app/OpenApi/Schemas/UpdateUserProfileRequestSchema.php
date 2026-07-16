<?php
namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;


#[OA\Schema(
    schema: "UpdateUserProfileRequest",
    properties: [
        new OA\Property(property: "username", type: "string"),
        new OA\Property(property: "email", type: "string"),
        new OA\Property(property: "password", type: "string"),

        new OA\Property(property: "nama_lengkap", type: "string"),
        new OA\Property(property: "sekolah", type: "string"),
        new OA\Property(property: "jurusan", type: "string"),
        new OA\Property(property: "nomor_telepon", type: "string")

    ]
)]
class UpdateUserProfileRequestSchema{}