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
     * Admin User login.
     *
     * @return void
     */
    protected function login(): void
    {
        // Admin user login.
        $this->actingAs($this->admin, 'admin');
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

        // Search Unique key.
        $this->assertDatabaseHas('owners', [
            'email' => 'owner@example.com',
        ]);
    }

    /**
     * Edit owner test with password.
     *
     * @return void
     */
    public function test_edit_owners()
    {
        $this->login();

        // Find ownerUser by id.
        $this->get('admin/owners/' . $this->owner->id . 'edit')
            ->assertSee($this->owner->id);

        // Update ownerUser.
        $this->put('admin/owners/' . $this->owner->id, [
            'name' => 'RenameUser',
            'email' => 'new-email-name@example.com',
            'password' => 'newPassword',
            'password_confirmation' => 'newPassword',
        ]);

        // Check Updated owner user in database.
        $this->assertDatabaseHas('owners', [
            'name' => 'RenameUser',
            'email' => 'new-email-name@example.com',
        ]);
        $newOwner = Owner::where('email', 'new-email-name@example.com')->first();
        $this->assertTrue(Hash::check('newPassword', $newOwner->password));
    }

    /**
     * Edit owner test no password.
     *
     * @return void
     */
    public function test_edit_no_password_owners()
    {
        $this->login();

        // Find ownerUser by id.
        $this->get('admin/owners/' . $this->owner->id . 'edit')
            ->assertSee($this->owner->id);

        // Update ownerUser.
        $this->put('admin/owners/' . $this->owner->id, [
            'name' => 'RenameUser',
            'email' => 'new-email-name@example.com',
        ]);

        // Check Updated owner user in database.
        $this->assertDatabaseHas('owners', [
            'name' => 'RenameUser',
            'email' => 'new-email-name@example.com',
        ]);
    }

    /**
     * Delete OwnerUser Test.
     * (Force Delete)
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

        // Soft delete is require before force delete.
        $this->delete('admin/owners/' . $this->owner->id);
        // Force delete.
        $this->delete('admin/expired-owners/destroy/' . $this->owner->id);

        $this->assertDatabaseMissing('owners', [
            'id' => $this->owner->id
        ]);
    }
}
