"""Add user table

Revision ID: 002
Revises: 001
Create Date: 2025-07-15 11:45:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '002'
down_revision = '001'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create users table
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('auth0_id', sa.String(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('picture', sa.String(), nullable=True),
        sa.Column('email_verified', sa.Boolean(), nullable=True),
        sa.Column('display_name', sa.String(), nullable=True),
        sa.Column('bio', sa.Text(), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=True),
        sa.Column('is_admin', sa.Boolean(), nullable=True),
        sa.Column('has_completed_onboarding', sa.Boolean(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('last_login', sa.DateTime(timezone=True), nullable=True),
        sa.Column('auth0_metadata', sa.Text(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_auth0_id'), 'users', ['auth0_id'], unique=True)
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)

    # Update team_memberships to reference users table
    op.drop_index('ix_team_memberships_user_id', table_name='team_memberships')
    op.drop_column('team_memberships', 'user_name')
    op.drop_column('team_memberships', 'user_email')
    
    # Add temporary column for migration
    op.add_column('team_memberships', sa.Column('user_id_new', sa.Integer(), nullable=True))
    
    # Note: In production, you would need to migrate existing data here
    # For now, we'll just remove the old column and rename the new one
    op.drop_column('team_memberships', 'user_id')
    op.alter_column('team_memberships', 'user_id_new', new_column_name='user_id', nullable=False)
    
    # Add foreign key constraint
    op.create_foreign_key('fk_team_memberships_user_id', 'team_memberships', 'users', ['user_id'], ['id'])
    op.create_index(op.f('ix_team_memberships_user_id'), 'team_memberships', ['user_id'], unique=False)

    # Update team_invitations to reference users table
    op.drop_column('team_invitations', 'invited_by_name')
    
    # Add temporary column for migration
    op.add_column('team_invitations', sa.Column('invited_by_user_id_new', sa.Integer(), nullable=True))
    
    # Note: In production, you would need to migrate existing data here
    op.drop_column('team_invitations', 'invited_by_user_id')
    op.alter_column('team_invitations', 'invited_by_user_id_new', new_column_name='invited_by_user_id', nullable=False)
    
    # Add foreign key constraint
    op.create_foreign_key('fk_team_invitations_invited_by_user_id', 'team_invitations', 'users', ['invited_by_user_id'], ['id'])

    # Update equipment table to reference users table
    op.drop_column('equipment', 'owner_name')
    
    # Add temporary column for migration
    op.add_column('equipment', sa.Column('owner_id_new', sa.Integer(), nullable=True))
    
    # Note: In production, you would need to migrate existing data here
    op.drop_column('equipment', 'owner_id')
    op.alter_column('equipment', 'owner_id_new', new_column_name='owner_id', nullable=True)
    
    # Add foreign key constraint
    op.create_foreign_key('fk_equipment_owner_id', 'equipment', 'users', ['owner_id'], ['id'])


def downgrade() -> None:
    # Remove foreign key constraints
    op.drop_constraint('fk_equipment_owner_id', 'equipment', type_='foreignkey')
    op.drop_constraint('fk_team_invitations_invited_by_user_id', 'team_invitations', type_='foreignkey')
    op.drop_constraint('fk_team_memberships_user_id', 'team_memberships', type_='foreignkey')
    
    # Revert equipment table
    op.alter_column('equipment', 'owner_id', new_column_name='owner_id_old')
    op.add_column('equipment', sa.Column('owner_id', sa.String(), nullable=True))
    op.add_column('equipment', sa.Column('owner_name', sa.String(), nullable=True))
    op.drop_column('equipment', 'owner_id_old')
    
    # Revert team_invitations table
    op.alter_column('team_invitations', 'invited_by_user_id', new_column_name='invited_by_user_id_old')
    op.add_column('team_invitations', sa.Column('invited_by_user_id', sa.String(), nullable=False))
    op.add_column('team_invitations', sa.Column('invited_by_name', sa.String(), nullable=True))
    op.drop_column('team_invitations', 'invited_by_user_id_old')
    
    # Revert team_memberships table
    op.drop_index(op.f('ix_team_memberships_user_id'), table_name='team_memberships')
    op.alter_column('team_memberships', 'user_id', new_column_name='user_id_old')
    op.add_column('team_memberships', sa.Column('user_id', sa.String(), nullable=False))
    op.add_column('team_memberships', sa.Column('user_name', sa.String(), nullable=True))
    op.add_column('team_memberships', sa.Column('user_email', sa.String(), nullable=True))
    op.drop_column('team_memberships', 'user_id_old')
    op.create_index(op.f('ix_team_memberships_user_id'), 'team_memberships', ['user_id'], unique=False)
    
    # Drop users table
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_index(op.f('ix_users_auth0_id'), table_name='users')
    op.drop_table('users')
