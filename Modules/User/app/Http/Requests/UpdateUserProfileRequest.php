<?php

namespace Modules\User\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserProfileRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'username' => ['sometimes','string'],
            'email' => ['sometimes', 'email'], 
            'password' => ['sometimes', 'string'],
            'nama_lengkap' => ['sometimes', 'string'],
            'sekolah' => ['sometimes', 'string'],
            'jurusan' => ['sometimes', 'string'],
            'nomor_telepon' => ['sometimes', 'string'], 
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
}
