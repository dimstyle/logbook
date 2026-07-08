<?php

namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema:"RegisterRequest",
    required: [
        // Account data
        "username","email","password",
        
        //User data
        "sekolah","jurusan","nomor_telepon",
        
        //range date
        "periode_awal","periode_akhir"
    ],
    properties:[    
        new OA\Property(property: "username", type: "string"),
        new OA\Property(property: "email", type: "string"),
        new OA\Property(property: "password", type: "string"),
        new OA\Property(property: "sekolah", type: "string"),
        new OA\Property(property: "jurusan", type: "string"),
        new OA\Property(property: "nomor_telepon", type: "string"),
        new OA\Property(property: "periode_awal", type: "string", format: "date"),
        new OA\Property(property: "periode_akhir", type: "string", format: "date")
    ]
)]
class RegisterRequestSchema{

}