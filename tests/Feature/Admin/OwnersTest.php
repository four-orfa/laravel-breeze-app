<?php

namespace Tests\Feature\Admin;

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Admin;
use App\Models\Owner;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class OwnersTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Initialize test data.
     * This function must be name `setUp`.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = Admin::factory()->create();
        $this->owner = Owner::factory()->create();
    }

    /**
     * Make test data.
     *
     * @return void
     */
    protected function login(): void
    {
        $this->post('/admin/login', [
            'email' => $this->admin->email,
            'password' => 'password',
        ]);
    }

    /**
     * Not logged in test.
     *
     * @return void
     */
    public function test_not_logged_in_can_not_be_rendered()
    {
        $this->get('admin/owners')->assertStatus(302);
        $this->get('admin/owners/create')->assertStatus(302);
        $this->get('admin/expired-owners')->assertStatus(302);
        $this->get('admin/owners/' . $this->owner->id . '/edit')->assertStatus(302);
    }

    /**
     * Logged in test.
     *
     * @return void
     */
    public function test_logged_in_screen_can_be_rendered()
    {
        $this->login();

        $this->assertAuthenticated('admin');

        $this->get('admin/owners')->assertStatus(200);
        $this->get('admin/owners/create')->assertStatus(200);
        $this->get('admin/expired-owners')->assertStatus(200);
        $owner = Owner::factory()->create();
        $this->get('admin/owners/' . $owner->id . '/edit')->assertStatus(200);
    }

    /**
     * Create OwnerUser Test.
     *
     * @return void
     */
    public function test_create_owners()
    {
        $this->login();

        $owner = [
            'name' => 'OwnerUser',
            'email' => 'owner@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ];

        $this->post('admin/owners', $owner);

        $this->assertDatabaseHas('owners', [
            'name' => 'OwnerUser',
            'email' => 'owner@example.com',
        ]);
    }

    /**
     * Edit owner test.
     *
     * @return void
     */
    public function test_edit_owners()
    {
        $this->login();

        $this->put('admin/owners/' . $this->owner->id, [
            'name' => 'RenameUser',
            'email' => 'new-email-name@example.com',
            'password' => 'newPassword',
            'password_confirmation' => 'newPassword',
        ]);

        $this->assertDatabaseHas('owners', [
            'name' => 'RenameUser',
            'email' => 'new-email-name@example.com',
        ]);
        $newOwner = Owner::where('email', 'new-email-name@example.com')->first();
        $this->assertTrue(Hash::check('newPassword', $newOwner->password));
    }

    /**
     * Delete OwnerUser Test.
     * (Soft Delete)
     *
     * @return void
     */
    public function test_delete_owners()
    {
        $this->login();

        $this->delete('admin/owners/' . $this->owner->id);
        $this->assertSoftDeleted('owners', [
            'id' => $this->owner->id
        ]);
    }

    /**
     * Delete OwnerUser Test.
     * (Soft Delete)
     *
     * @return void
     */
    public function test_force_delete_owners()
    {
        $this->login();

        $this->delete('admin/owners/' . $this->owner->id);
        $this->delete('admin/expired-owners/destroy/' . $this->owner->id);

        $this->assertDatabaseMissing('owners', [
            'id' => $this->owner->id
        ]);
    }
}
