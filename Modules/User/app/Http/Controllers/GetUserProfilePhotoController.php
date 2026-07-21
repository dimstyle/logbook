<?php

namespace Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Modules\User\Models\User;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class GetUserProfilePhotoController extends Controller
{
    public function handle(){
        $user = Auth::user();

        try{
            $url = $this->getUserPhoto($user->id);
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
            'url' => $url
        ],Response::HTTP_OK);
    }

    private function getUserPhoto(int $id){
        return User::select('profile_photo')
        ->where('account_id', $id)
        ->firstOrFail();
    }
}
