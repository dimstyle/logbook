<?php 
namespace App\OpenApi\Schemas;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "MessageWithErrorResponse",
    required: ["message" , "error"],
    properties: [
        new OA\Property(property: "message", type: "string"),
        new OA\Property(property: "error", type: "error_obj")   
    ]
)]
class MessageWithErrorResponse{}