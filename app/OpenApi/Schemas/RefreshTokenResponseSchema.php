<?php

namespace App\OpenApi\Schemas;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema:"RefreshTokenResponse",
    required: [

        "message", "token"
    ],
    properties:[    
        new OA\Property(property: "message", type: "string"),
        new OA\Property(property: "token", type: "string"),
    ]
)]
class RefreshTokenResponseSchema{}