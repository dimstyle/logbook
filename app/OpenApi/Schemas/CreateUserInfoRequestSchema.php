<?php
namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;


#[OA\Schema(
    schema: "CreateUserInfoRequest",
    required : [
          //User data
        "sekolah","jurusan","nomor_telepon",
        
        //range date
        "periode_awal","periode_akhir"
    ],
    properties: [
        new OA\Property(property: "account_id", type: "integer"),
        new OA\Property(property: "sekolah", type: "string"),
        new OA\Property(property: "jurusan", type: "string"),
        new OA\Property(property: "nomor_telepon", type: "string"),
        new OA\Property(property: "periode_awal", type: "string", format: "date"),
        new OA\Property(property: "periode_akhir", type: "string", format: "date")
    ]
)]
class CreateUserInfoRequestSchema{}