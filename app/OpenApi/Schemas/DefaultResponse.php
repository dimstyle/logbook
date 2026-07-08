<?php 
namespace App\OpenApi\Schemas;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "DefaultResponse",
    required: ["message"],
    properties:[new OA\Property(property: "message", type: "string")]
)]
class DefaultResponse{}