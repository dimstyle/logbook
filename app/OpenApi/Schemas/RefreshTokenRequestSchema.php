<?php

namespace App\OpenApi\Schemas;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema:"RefreshTokenRequest",
    required: [

       "token"
    ],
    properties:[    
        new OA\Property(property: "token", type: "string"),
    ]
)]
class RefreshTokenRequestSchema{}