<?php

namespace Modules\Auth\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'username' => ['required','string'],
            'email' => ['required', 'email',Rule::unique('users','email')],
            'password' => ['required', 'string', 'min:8'],
            'sekolah' => ['required', 'string'],
            'jurusan' => ['required', 'string'],
            'nomor_telepon' => ['required', 'string'],
            'periode_awal' => ['required', 'date'],
            'periode_akhir' => ['required', 'date']
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
