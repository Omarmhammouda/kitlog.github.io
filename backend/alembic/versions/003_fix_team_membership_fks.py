"""Fix team membership foreign keys

Revision ID: 003
Revises: 002
Create Date: 2025-07-19 15:40:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '003'
down_revision = '002'
branch_labels = None
depends_on = None

def upgrade() -> None:
    # The 002 migration already converted user_id to integer and added FK
    # This migration just cleans up any remaining issues
    
    # Remove user_name and user_email columns from team_memberships if they exist
    # (These were added by the conflicting migration that we deleted)
    try:
        op.drop_column('team_memberships', 'user_name')
    except:
        pass  # Column might not exist
        
    try:
        op.drop_column('team_memberships', 'user_email')
    except:
        pass  # Column might not exist
    
    # Fix team_invitations.invited_by_user_id to be integer FK
    # Drop the column and recreate it as integer
    op.drop_column('team_invitations', 'invited_by_name')
    
    # Convert invited_by_user_id from string to integer FK
    op.drop_column('team_invitations', 'invited_by_user_id')
    op.add_column('team_invitations', sa.Column('invited_by_user_id', sa.Integer(), nullable=False))
    op.create_foreign_key('fk_team_invitations_invited_by_user_id', 'team_invitations', 'users', ['invited_by_user_id'], ['id'])

def downgrade() -> None:
    # Reverse the changes
    op.drop_constraint('fk_team_invitations_invited_by_user_id', 'team_invitations', type_='foreignkey')
    op.drop_column('team_invitations', 'invited_by_user_id')
    op.add_column('team_invitations', sa.Column('invited_by_user_id', sa.String(), nullable=False))
    op.add_column('team_invitations', sa.Column('invited_by_name', sa.String(), nullable=True))
    
    # Add back the user_name and user_email columns
    op.add_column('team_memberships', sa.Column('user_name', sa.String(), nullable=True))
    op.add_column('team_memberships', sa.Column('user_email', sa.String(), nullable=True))
