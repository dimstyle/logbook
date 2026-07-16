<?php

namespace Modules\Attendance\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateAttendanceCheckInRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'sudah_hadir' => ['required', 'boolean'],
            'jam_hadir' => ['required', 'date_format:H:i'],
            'wfh' => ['required', 'boolean']
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
