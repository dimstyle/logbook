<?php

namespace Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\User\Http\Requests\UpdateUserPasswordRequest;
use Modules\User\Services\UpdateUserPasswordService;
use Symfony\Component\HttpFoundation\Response;

class UpdateUserPasswordController extends Controller
{
    public function __construct(
        private UpdateUserPasswordService $updateUserPasswordService
    ) {}

    public function handle(UpdateUserPasswordRequest $request)
    {
        $this->updateUserPasswordService->handle(
            $request->validated()
        );

        return response()->json([
            'message' => 'Success to update password'
        ], Response::HTTP_OK);
    }
}