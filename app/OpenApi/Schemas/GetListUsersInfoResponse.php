<?php 
namespace App\OpenApi\Schemas;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "GetListUsersInfoResponse",
    required: ["message", "users"],
    properties:[
        new OA\Property(property: "message", type: "string"),
        new OA\Property(
            property: "users", 
            type: "array",
            items: new OA\Items(
                properties: [
                    new OA\Property(property: "id", type: "integer"),
                    new OA\Property(property: "nama_lengkap", type: "string"),
                    new OA\Property(property: "sekolah", type: "string"),
                    new OA\Property(property: "jurusan", type: "string"),
                    new OA\Property(property: "email", type: "string")
                ]
            )
        )
    ]
)]
class GetListUsersInfoResponse{}