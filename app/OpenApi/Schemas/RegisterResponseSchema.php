<?php 
namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "RegisterResponse",
    required: ["message", "account_id"],
    properties: [
        new OA\Property(property: "message", type: "string"),
        new OA\Property(property: "account_id", type: "integer")
    ]
)]
class RegisterResponseSchema{}