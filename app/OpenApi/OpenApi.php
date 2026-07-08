<?php

namespace App\OpenApi;
use OpenApi\Attributes as OA;

#[OA\Info(
    title: "My Backend API",
    version: "1.0.0",
    description: "Backend API Documentation"
)]
#[OA\Server(
    url: '/api'
)]
final class OpenApi
{}