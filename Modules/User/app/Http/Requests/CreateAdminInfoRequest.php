<?php

namespace Modules\User\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateAdminInfoRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'perusahaan' => ['required', 'string'],
            'divisi' => ['required', 'string'],
            'nomor_telepon' => ['required', 'string']
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
