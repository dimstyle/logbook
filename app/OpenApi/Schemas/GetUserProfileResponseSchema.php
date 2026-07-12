<?php 
namespace App\OpenApi\Schemas;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "GetUserProfileResponse",
    required: ["message", "user"],
    properties: [
        new OA\Property(property: "message", type: "string"),
        new OA\Property(
            property: "user",
            type: "object",
            required: [
                //id 
                "id", "account_id",
                
                // user data
                "sekolah" , "jurusan", "nomor_telepon", "hadir", "tidak_masuk", "laporan",

                // range date
                "periode_awal", "periode_akhir"
            ],
            properties: [
                new OA\Property(property: "id", type: "integer"),
                new OA\Property(property: "account_id", type: "integer"),

                new OA\Property(property: "sekolah", type: "string"),
                new OA\Property(property: "jurusan", type: "string"),
                new OA\Property(property: "nomor_telepon", type: "string"),
                new OA\Property(property: "hadir", type: "integer"),
                new OA\Property(property: "tidak_masuk", type: "integer"),
                new OA\Property(property: "laporan", type: "integer"),
                
                new OA\Property(property: "periode_awal", type: "string", format: "date"),
                new OA\Property(property: "periode_akhir", type: "string", format: "date"),
                new OA\Property(property: "created_at",type: "string", format: "date-time"),
                new OA\Property(property: "updated_at",type: "string", format: "date-time")

            ]
        )
    ]
)]
class GetUserProfileResponseSchema{}