<?php 
namespace App\OpenApi\Schemas;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "GetAdminProfileResponse",
    required: ["message", "admin"],
    properties: [
        new OA\Property(property: "message", type: "string"),
        new OA\Property(
            property: "admin",
            type: "object",
            required: [
                //account
                "username","email","role",
                
                //id
                "id", "account_id",
                
                // user data
                "perusahaan" , "divisi", "nomor_telepon", "siswa_pkl", "sekolah_mitra", "laporan_hari_ini",

                // range date
                "periode_awal", "periode_akhir"
            ],
            properties: [
                new OA\Property(property: "username", type: "string"),
                new OA\Property(property: "email", type: "string"),
                new OA\Property(property: "role", type: "string"),

                new OA\Property(property: "id", type: "integer"),
                new OA\Property(property: "account_id", type: "integer"),

                new OA\Property(property: "perusahaan", type: "string"),
                new OA\Property(property: "divisi", type: "string"),
                new OA\Property(property: "nomor_telepon", type: "string"),
                new OA\Property(property: "siswa_pkl", type: "integer"),
                new OA\Property(property: "sekolah_mitra", type: "integer"),
                new OA\Property(property: "laporan_hari_ini", type: "integer"),

                new OA\Property(property: "created_at",type: "string", format: "date-time"),
                new OA\Property(property: "updated_at",type: "string", format: "date-time")

            ]
        )
    ]
)]
class GetAdminProfileResponseSchema{}