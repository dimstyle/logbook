<?php

namespace App\OpenApi\Security;

use OpenApi\Attributes as OA;

#[OA\SecurityScheme(
    securityScheme: "bearerAuth",
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT"
)]
class BearerAuth{}