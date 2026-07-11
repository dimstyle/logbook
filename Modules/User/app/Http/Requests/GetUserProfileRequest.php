<?php

namespace Modules\User\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetUserProfileRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $required_value = collect([]);
        if( $this->user()->role === 'admin'){
            $required_value->put('account_id' , ['required', 'integer','exists:accounts,id']);
        }

        return $required_value->toArray();
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
        // $this->replace(
        //     $this->only(array_keys($this->rules()))
        // );
    }
}
