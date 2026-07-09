<?php

namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema:"RegisterRequest",
    required: [
        // Account data
        "username","email","password",
    ],
    properties:[    
        new OA\Property(property: "username", type: "string"),
        new OA\Property(property: "email", type: "string"),
        new OA\Property(property: "password", type: "string"),
    ]
)]
class RegisterRequestSchema{}