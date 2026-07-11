<?php

namespace Modules\User\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserInfoRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'account_id' => ['required', 'integer','exists:accounts,id'], 
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

    protected function prepareForValidation(): void
    {
        $this->replace(
            $this->only(array_keys($this->rules()))
        );
    }
}
