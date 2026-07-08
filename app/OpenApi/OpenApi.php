<?php

namespace App\OpenApi;

use OpenApi\Attributes as OA;

#[OA\Info(
    title: "My Backend API",
    version: "1.0.0",
    description: "Backend API Documentation"
)]
final class OpenApi
{
    #[OA\Get(
        path: "/api/test",
        summary: "Test endpoint",
        tags: ["Test"],
        responses: [
            new OA\Response(
                response: 200,
                description: "Success"
            )
        ]
    )]  
    public function test(){
        return response()->json([
            "message" => "succes"
        ]);
    }

}