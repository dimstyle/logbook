<?php

namespace Modules\Attendance\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAttendanceReportRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
        
            'attendance_id' => ['required', 'integer'],
            'laporan' => ['required', 'string'],

            'new_images' => ['nullable', 'array'],
            'new_images.*.id' => ['required', 'integer'],
            'new_images.*.images' => ['required', 'file', 'image'],

            'changed_images' => ['nullable', 'array'],
            'changed_images.*.id' => ['required', 'integer'],
            'changed_images.*.images' => ['required', 'file', 'image'],
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
