<?php

namespace Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Auth\Services\DeleteAccountService;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class DeleteAccountController extends Controller
{
    public function __construct(
        private DeleteAccountService $deleteAccountService
    ){}

    public function handle($id){   
        try{    
            $this->deleteAccountService->handle($id);
        }catch(Throwable $e){
            return response()->json([
                'message' => 'Internal server error'
            ],Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => 'Success to delete user'
        ], Response::HTTP_NO_CONTENT);
    }
}
