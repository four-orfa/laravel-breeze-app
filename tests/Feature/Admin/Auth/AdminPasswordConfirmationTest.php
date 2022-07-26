<?php

namespace Tests\Feature\Admin\Auth;

use App\Models\Admin;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PasswordConfirmationTest extends TestCase
{
    use RefreshDatabase;

    public function test_confirm_password_screen_can_be_rendered()
    {
        /** @var \Illuminate\Contracts\Auth\Authenticatable $admin */
        $admin = Admin::factory()->create();

        $response = $this->actingAs($admin, 'admin')->get('/admin/confirm-password');

        $response->assertStatus(200);
    }

    public function test_password_can_be_confirmed()
    {
        /** @var \Illuminate\Contracts\Auth\Authenticatable $admin */
        $admin = Admin::factory()->create();

        $response = $this->actingAs($admin, 'admin')->post('/admin/confirm-password', [
            'password' => 'password',
        ]);

        $response->assertRedirect();
        $response->assertSessionHasNoErrors();
    }

    public function test_password_is_not_confirmed_with_invalid_password()
    {
        /** @var \Illuminate\Contracts\Auth\Authenticatable $admin */
        $admin = Admin::factory()->create();

        $response = $this->actingAs($admin, 'admin')->post('/admin/confirm-password', [
            'password' => 'wrong-password',
        ]);

        $response->assertSessionHasErrors();
    }
}
