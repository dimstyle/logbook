<?php

namespace Modules\Attendance\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateAttendanceCheckInRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {  
        $allowedStatus = ["wfo","wfh","izin","sakit"];

        return [
            'status' => ['required', 'string', Rule::in($allowedStatus)],
            'jam_hadir' => ['required', 'date_format:H:i'],
            'alasan' => ['nullable','string']
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
