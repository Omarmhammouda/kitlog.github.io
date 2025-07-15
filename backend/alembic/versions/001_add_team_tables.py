"""Add team tables

Revision ID: 001
Revises: 
Create Date: 2025-07-15 11:07:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create teams table
    op.create_table(
        'teams',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('subscription_type', sa.String(), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_teams_id'), 'teams', ['id'], unique=False)
    op.create_index(op.f('ix_teams_name'), 'teams', ['name'], unique=False)

    # Create team_memberships table
    op.create_table(
        'team_memberships',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.String(), nullable=False),
        sa.Column('team_id', sa.Integer(), nullable=False),
        sa.Column('role', sa.String(), nullable=True),
        sa.Column('joined_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('user_name', sa.String(), nullable=True),
        sa.Column('user_email', sa.String(), nullable=True),
        sa.ForeignKeyConstraint(['team_id'], ['teams.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_team_memberships_id'), 'team_memberships', ['id'], unique=False)
    op.create_index(op.f('ix_team_memberships_user_id'), 'team_memberships', ['user_id'], unique=False)

    # Create team_invitations table
    op.create_table(
        'team_invitations',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('team_id', sa.Integer(), nullable=False),
        sa.Column('role', sa.String(), nullable=True),
        sa.Column('token', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('expires_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('is_accepted', sa.Boolean(), nullable=True),
        sa.Column('accepted_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('invited_by_user_id', sa.String(), nullable=False),
        sa.Column('invited_by_name', sa.String(), nullable=True),
        sa.ForeignKeyConstraint(['team_id'], ['teams.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_team_invitations_email'), 'team_invitations', ['email'], unique=False)
    op.create_index(op.f('ix_team_invitations_id'), 'team_invitations', ['id'], unique=False)
    op.create_index(op.f('ix_team_invitations_token'), 'team_invitations', ['token'], unique=True)


def downgrade() -> None:
    # Drop tables in reverse order
    op.drop_index(op.f('ix_team_invitations_token'), table_name='team_invitations')
    op.drop_index(op.f('ix_team_invitations_id'), table_name='team_invitations')
    op.drop_index(op.f('ix_team_invitations_email'), table_name='team_invitations')
    op.drop_table('team_invitations')
    
    op.drop_index(op.f('ix_team_memberships_user_id'), table_name='team_memberships')
    op.drop_index(op.f('ix_team_memberships_id'), table_name='team_memberships')
    op.drop_table('team_memberships')
    
    op.drop_index(op.f('ix_teams_name'), table_name='teams')
    op.drop_index(op.f('ix_teams_id'), table_name='teams')
    op.drop_table('teams')
