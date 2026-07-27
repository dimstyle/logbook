<?php

namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "RegisterExcelFormatRequest",
    required: ["register_file"],
    properties: [
        new OA\Property(
            property: "register_file",
            description: "Excel file containing user registration data",
            type: "string",
            format: "binary"
        )
    ] 
)]
class RegisterExcelFormatRequestSchema
{
    public string $register_file;
}