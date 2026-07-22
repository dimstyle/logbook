<?php

namespace Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Modules\User\Models\User;
use Modules\User\Repositories\UserRepository;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class GetUserProfilePhotoController extends Controller
{
    public function __construct(
        private UserRepository $userRepository
    ){}

    public function handle(){
        $user = Auth::user();

        try{
            $url = $this->userRepository->getUserPhoto($user->id);
        }catch(ModelNotFoundException $e){
            return response()->json([
                'message' => 'User not found'
            ],Response::HTTP_NOT_FOUND);
        }catch(Throwable $e){
            return response()->json([
                'message' => 'Internal server error'
            ],Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => 'Success to get profile photo',
            'url' => $url->profile_photo
        ],Response::HTTP_OK);
    }


}
